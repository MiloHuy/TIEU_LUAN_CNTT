const Story = require('../models/Story')

//GET /stories
exports.getAll = (async (req, res, next) => {
    Story.find({})
        .then(stories => {
            res.status(200).json({
                success: true,
                stories
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false, 
                message: err.message 
            });
        })
})

//GET /stories/:id
exports.getStory = (async (req, res, next) => {
    Story.findById(req.params.id)
    .then(story => {
        res.status(200).json({
            success: true,
            story
        })
    })
    .catch(err => {
        res.status(500).json({
            success: false, 
            message: err.message 
        });
    })
})

//GET /stories/create
exports.create = (async (req, res, next) => {
    res.send('Hello World!')
})

//POST /stories/store
exports.store = (async (req, res, next) => {
    try {
        const story = await Story.create(req.body);
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

//GET /stories/:id/edit
exports.edit = (async (req, res, next) => {

    res.send('Hello World!')

})

//PUT /stories/:id
exports.update = (async (req, res, next) => {
    Story.updateOne({_id: req.params.id}, req.body)
        .then(story => {
            res.status(200).json({
                success: true,
                message: 'Cập nhật story thành công.',
                story
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false, 
                message: err.message 
            });
        })
})

//DELETE /stories/:id
exports.destroy = (async (req, res, next) => {
    Story.deleteOne({_id: req.params.id})
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Xóa story thành công.',
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false, 
                message: err.message 
            });
        })
})