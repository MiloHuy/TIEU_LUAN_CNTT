const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');

const Post = require('../models/Post')
const Post_like = require('../models/Post_like')
const Post_stored = require('../models/Post_stored')

//GET /posts
exports.getAll = (async (req, res) => {
    try {
        const posts = await Post.find().limit(10).populate('user_id', 'first_name last_name avatar.url').select('-post_img.publicId');
        if(request.length === 0){
            return res.status(200).json({
                success: true,
                message: 'Chưa có bài viết nào.',
            });
        }
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
        const check_post = await Post.findOne({ _id: req.params.id });
        if(!check_post){
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài viết.', 
            });
        }
        const post = await Post.findById(req.params.id).populate('user_id', 'first_name last_name avatar.url').select('-post_img.publicId');
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

const allowedFormats = /^(data:image\/jpeg|data:image\/jpg|data:image\/png);base64,/i;

//POST /posts/create
exports.create = (async (req, res) => {
    try {
        if(req.body.post_img==null){
            res.status(400).json({
                success: false,
                message: 'Đăng bài thất bại. Bài đăng phải có ảnh.',
                post,
            });
        }
        const currentDate = new Date();
        const fileFormatMatch = req.body.post_img.match(allowedFormats);
        
        if (!fileFormatMatch) {
            return res.status(400).json({
                success: false,
                message: 'Định dạng ảnh không hợp lệ. Chỉ chấp nhận định dạng .jpg, .jpeg hoặc .png.',
            });
        }

        const result = await cloudinary.uploader.upload(req.body.post_img);
        post_img = {
            publicId: result.public_id,
            url: result.secure_url,
        }

        const post = await Post.create({ user_id:req.user._id , ...req.body, create_post_time: currentDate, post_img});
        res.status(201).json({
            success: true,
            message: 'Đăng bài thành công.',
            post,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Đăng bài thất bại :' + error, 
        });
    }
    finally{

    }
})

//POST /posts/store/:id
exports.store = (async (req, res) => {
    try {
        const check_post = await Post.findOne({ _id: req.params.id });
        if(!check_post){
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài viết.', 
            });
        }
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
        const check_post = await Post.findOne({ _id: req.params.id });
        if(!check_post){
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài viết.', 
            });
        }
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