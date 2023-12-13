const moment = require('moment');

const Post = require('../models/Post')
const Story = require('../models/Story')
const Follow = require('../models/Follow')
const Friend = require('../models/Friend')
const User = require('../models/User')

//GET /statistics/admin
exports.getAdminStatistics = (async (req, res) => {
    try {
        const count_accounts = await User.countDocuments({ role_id: { $ne: 0 } })

        const today = new Date();
        const startOfDay = moment(today).startOf('day').toDate();
        const endOfDay = moment(today).endOf('day').toDate();
        const count_post_in_day = await Post.countDocuments({
            create_post_time: {
              $gte: startOfDay,
              $lte: endOfDay,
            },
        })

        const startOfWeek = moment(today).startOf('week').toDate();
        const endOfWeek = moment(today).endOf('week').toDate();
        const count_post_in_week = await Post.countDocuments({
            create_post_time: {
              $gte: startOfWeek,
              $lte: endOfWeek,
            },
        })

        const startOfMonth = moment(today).startOf('month').toDate();
        const endOfMonth = moment(today).endOf('month').toDate();
        const count_post_in_month = await Post.countDocuments({
            create_post_time: {
              $gte: startOfMonth,
              $lte: endOfMonth,
            },
        })

        res.status(200).json({
            success: true,
            count_accounts,
            count_post_in_day,
            count_post_in_week,
            count_post_in_month
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 1069,
            message: err.message, 
        });
    }
})

//GET /statistics/:id
exports.getStatistics = (async (req, res) => {
    try {
        const user = await User.findOne({ _id:req.params.id }).select('_id')
        if(!user){
            return res.status(404).json({
                success: false,
                code: 1070,
                message: 'Không tìm thấy người dùng', 
            });
        }

        const count_posts = await Post.countDocuments({ user_id:req.params.id });

        const user_follow = await Follow.findOne({ user_id:req.params.id });
        const count_followers = user_follow ? user_follow.follower_user_id.length : 0;
        const count_followings = user_follow ? user_follow.following_user_id.length : 0;

        const user_friend = await Friend.findOne({ user_id:req.params.id });
        const count_friends = user_friend ? user_friend.friend_id.length : 0;

        res.status(200).json({
            success: true,
            user,
            message: 'Thống kê:',
            count_posts,
            count_followers,
            count_followings,
            count_friends,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 1071,
            message: err.message, 
        });
    }
})