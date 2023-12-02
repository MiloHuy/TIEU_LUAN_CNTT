const Post = require('../models/Post')
const Story = require('../models/Story')
const Follow = require('../models/Follow')
const Friend = require('../models/Friend')

//GET /statistics/:id

exports.getStatistics = (async (req, res) => {
    try {
        const count_posts = await Post.countDocuments({ user_id:req.params.id });
        const count_stories = await Story.countDocuments({ user_id:req.params.id });

        const user_follow = await Follow.findOne({ user_id:req.params.id });
        const count_followers = user_follow ? user_follow.follower_user_id.length : 0;
        const count_followings = user_follow ? user_follow.following_user_id.length : 0;

        const user = await Friend.findOne({ user_id:req.params.id });
        const count_friends = user ? user.friend_id.length : 0;

        res.status(200).json({
            success: true,
            message: 'Thống kê:',
            count_posts,
            count_stories,
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