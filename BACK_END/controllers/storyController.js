const Story = require('../models/Story')
const Story_like = require('../models/Story_like')

//GET /stories
exports.getAll = (async (req, res) => {
    try {
        const stories = await Story.find();
        res.status(200).json({
            success: true,
            stories
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message 
        });
    }
})

//GET /stories/:id
exports.getStory = (async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        res.status(200).json({
            success: true,
            story
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message 
        });
    }
})

//GET /posts/like/:id
exports.like = (async (req, res) => {
    try {
        const story = await Story.findById({_id: req.params.id});
        if(!story){
            res.status(400).json({
                success: false,
                message: 'Story không tồn tại.' ,
            });
        }
        await Story_like.create({ user_id:req.user._id , story_id:req.params.id });
        res.status(201).json({
            success: true,
            message: 'Yêu thích thành công.',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message 
        });
    }
})

//POST /stories/create
exports.create = (async (req, res) => {
    try {
        const story = await Story.create({ user_id:req.user._id ,...req.body});
        res.status(201).json({
            success: true,
            message: 'Đăng story thành công.',
            story
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message 
        });
    }
})

//PUT /stories/:id
exports.update = (async (req, res) => {
    try {
        const story = await Story.findById({_id: req.params.id});
        if(!story){
            res.status(400).json({
                success: false,
                message: 'Story không tồn tại.' ,
            });
        }
        await Story.findByIdAndUpdate({_id: req.params.id}, {user_id:req.user._id, ...req.body});
        res.status(200).json({
            success: true,
            message: 'Cập nhật story thành công.',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message 
        });
    }
})

//DELETE /stories/:id
exports.destroy = (async (req, res) => {
    try {
        const story = await Story.findById({_id: req.params.id});
        if(!story){
            res.status(400).json({
                success: false,
                message: 'Story không tồn tại.' ,
            });
        }
        await Story.deleteOne({_id: req.params.id});
        await Story_like.deleteOne({story_id : req.params.id});
        res.status(201).json({
            success: true,
            message: 'Xóa story thành công.',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message 
        });
    }
})