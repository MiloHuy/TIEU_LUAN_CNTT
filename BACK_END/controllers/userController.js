const User = require('../models/User')
const Friend = require('../models/Friend');
const { UserAPIFeatures } = require('../utils/APIFeatures');
const { query } = require('express');
const Post = require('../models/Post');
const Post_liked = require('../models/Post_liked');

//GET /info/:id
exports.getInfo = (async (req, res) => {
    try {
        if(req.params.id==req.user._id){
            return res.status(400).json({
                success: false,
                message:'Phải dùng id của người khác, không được dùng id của bản thân.',
            });
        }
        const user = await User.findOne({ _id: req.params.id }).select('first_name last_name avatar.url');
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng.', 
            });
        }
        const check_friend = await Friend.findOne({
            user_id: req.params.id,
            friend_id: req.user._id,
        })
        const friend = check_friend ? true : false;

        res.status(200).json({
            success: true,
            user,
            friend
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error, 
        });
    }
})

//GET /posts/:id
exports.getPosts = (async (req, res) => {
    try {
        if(req.params.id==req.user._id){
            return res.status(400).json({
                success: false,
                message:'Phải dùng id của người khác, không được dùng id của bản thân.',
            });
        }
        const user = await User.findOne({ _id: req.params.id });
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng.', 
            });
        }

        const posts = await Post.find({ user_id : req.params.id })
            .select('_id post_img.url')
            .lean()
        if(posts.length===0){
            return res.status(200).json({
                success: true,
                message: 'Chưa có đăng bài.'
            })
        } 

        const postsAfferCountLike = await Promise.all(posts.map(async (post) => {
            const post_like = await Post_liked.findOne({ post_id: post._id });
            const likes = post_like ? post_like.user_id.length : 0;

            //Làm thêm phần count_cmt
        
            return {
                ...post,
                likes,
            };
        }));

        return res.status(200).json({
            success: true,
            posts: postsAfferCountLike
        })
            
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message, 
        });
    }
})

//GET /users/admin
exports.getAll = (async (req, res, next) => {
    User.find({})
        .then(posts => {
            res.json(posts)
            res.status(200).json({
                success: true,
                posts
            })
        })
        .catch(next)
})

//DELETE /users/admin/:id
exports.disabled = (async (req, res, next) => {
    User.delete({ _id: req.params.id})
      .then(() => res.redirect('back'))
      .catch(next)

})

exports.getAllUser = (async (req, res) => {
    try {
        const { size } = req.query;
        const userQuery = User.find({ role_id: { $ne: 0 } }).select('avatar.url first_name last_name');
        
        const apiFeatures = new UserAPIFeatures(userQuery, req.query)
            .search();
        
        let allUser = await apiFeatures.query;
        const totals = allUser.length;

        const apiFeaturesPagination = new UserAPIFeatures(User.find(userQuery), req.query)
            .search()
            .pagination(size);

        allUser = await apiFeaturesPagination.query;
        
        return res.status(200).json({
            success: true,
            totals,
            allUser, 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error, 
        });
    }
});