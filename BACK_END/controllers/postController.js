const Post = require('../models/Post')
const Post_like = require('../models/Post_like')
const Post_stored = require('../models/Post_stored')

//GET /posts
exports.getAll = (async (req, res) => {
    try {
        const posts = await Post.find().limit(10).populate('user_id', 'first_name last_name');
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
        const post = await Post.findById(req.params.id).populate('user_id', 'first_name', 'last_name');
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

//POST /posts/store/:id
exports.store = (async (req, res) => {
    try {
        const stored = await Post_stored.findOneAndUpdate(
            { user_id: req.user._id },
            {},
            { new: true, upsert: true }
        );
        if(stored.post_id.includes(req.params.id)){
            stored.post_id.pull(req.params.id);
            await stored.save();
            res.status(201).json({
                success: true,
                message: 'Bỏ lưu bài viết.',
            });
        } else{
            stored.post_id.push(req.params.id);
            await stored.save();
            res.status(201).json({
                success: true,
                message: 'Lưu bài viết thành công.',
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message, 
        });
    }
})

//POST /posts/like/:id
exports.like = (async (req, res) => {
    try {
        const liked = await Post_like.findOneAndUpdate(
            { post_id: req.params.id },
            {},
            { new: true, upsert: true }
        );
        if(liked.user_id.includes(req.user._id)){
            //console.log(user)
            liked.user_id.pull(req.user._id);
            await liked.save();
            res.status(201).json({
                success: true,
                message: 'Bỏ yêu thích.',
            });
        } else{
            liked.user_id.push(req.user._id);
            await liked.save();
            res.status(201).json({
                success: true,
                message: 'Yêu thích bài viết thành công.',
            });
        }
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
        await Post.updateOne({ _id: req.params.id , user_id:req.user._id}, req.body);
        res.status(201).json({
            success: true,
            message: 'Cập nhật bài viết thành công.',
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
        res.status(200).json({
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