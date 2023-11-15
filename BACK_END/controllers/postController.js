const Post = require('../models/Post')
const Post_like = require('../models/Post_like')
const Post_stored = require('../models/Post_stored')

//GET /posts
exports.getAll = (async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json({
            success: true,
            posts,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message, 
        });
    }
})

//GET /posts/:id
exports.getPost = (async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json({
            success: true,
            post,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message ,
        });
    }
})

//POST /posts/create
exports.create = (async (req, res) => {
    try {
        const post = await Post.create({ user_id:req.user._id ,...req.body});
        res.status(201).json({
            success: true,
            message: 'Đăng bài thành công.',
            post,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message, 
        });
    }
})

//GET /posts/store/:id
exports.store = (async (req, res) => {
    try {
        await Post_stored.create({ user_id:req.user._id , post_id:req.params.id });
        res.status(201).json({
            success: true,
            message: 'Lưu bài viết thành công.',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message, 
        });
    }
})

//GET /posts/like/:id
exports.like = (async (req, res) => {
    try {
        await Post_like.create({ user_id:req.user._id , post_id:req.params.id });
        res.status(201).json({
            success: true,
            message: 'Yêu thích thành công.',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message, 
        });
    }
})

//PUT /posts/:id
exports.update = (async (req, res) => {
    try {
        const post = await Post.updateOne({ _id: req.params.id , user_id:req.user._id}, req.body);
        res.status(201).json({
            success: true,
            message: 'Cập nhật bài viết thành công.',
            post,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message, 
        });
    }
})

//DELETE /posts/:id
exports.destroy = (async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id, user_id:req.user._id})
        res.status(201).json({
            success: true,
            message: 'Xóa bài viết thành công.',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message ,
        });
    }
})


//GET /posts/admin
exports.adminGetAll = (async (req, res) => {
    try {
        const posts = await Post.find({})
        res.status(201).json({
            success: true,
            posts,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message ,
        });
    }
})

//DELETE /posts/admin/:id
exports.adminDestroy = (async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id})
        res.status(201).json({
            success: true,
            message: 'Xóa bài viết thành công.',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message, 
        });
    }

})