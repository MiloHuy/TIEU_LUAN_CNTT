const cloudinary = require('cloudinary').v2;

const Comment = require('../models/Comment');

//GET /:id
exports.getComments = (async (req, res) => {
    try {
        const comments = await Comment.find({post_id:req.params.id})
        res.status(200).json({
            success: true,
            comments,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message ,
        });
    }
})

//POST /comments/create/:id
exports.create = (async (req, res) => {
    try {
        const currentDate = new Date();

        const comment = await Comment.create({ 
            user_id:req.user._id, 
            post_id:req.params.id, 
            ...req.body, 
            create_comment_time: currentDate
        });
        res.status(201).json({
            success: true,
            message: 'Comment thành công.',
            comment,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message, 
        });
    }
})

