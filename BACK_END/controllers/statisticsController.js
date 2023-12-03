const Post = require('../models/Post')
const Story = require('../models/Story')
const Follow = require('../models/Follow')
const Friend = require('../models/Friend')
const User = require('../models/User')

//GET /statistics/:id

exports.getStatistics = (async (req, res) => {
    try {
        const user = await User.findOne({ _id:req.params.id }).select('_id')
        if(!user){
            return res.status(400).json({
                success: false,
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
            message: err.message, 
        });
    }
})