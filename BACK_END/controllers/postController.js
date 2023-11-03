const Post = require('../models/Post')

//GET /posts
exports.getAll = (async (req, res, next) => {
    Post.find({})
        .then(posts => {
            res.status(200).json({
                success: true,
                posts
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false, 
                message: err.message 
            });
        })
})

//GET /posts/:id
exports.getPost = (async (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            res.status(200).json({
                success: true,
                post
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false, 
                message: err.message 
            });
        })
})

//GET /posts/create
exports.create = (async (req, res, next) => {

})

//POST /posts/store
exports.store = (async (req, res, next) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Đăng bài thành công.',
            post
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message 
        });
    }
})

//GET /posts/:id/edit
exports.edit = (async (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            res.status(200).json({
                success: true,
                post
            })
        })
    .catch(err => {
        res.status(500).json({
            success: false, 
            message: err.message 
        });
    })
})

//PUT /posts/:id
exports.update = (async (req, res, next) => {
    Post.updateOne({ _id: req.params.id}, req.body)
        .then(post => {
            res.status(200).json({
                success: true,
                message: 'Cập nhật bài viết thành công.',
                post
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false, 
                message: err.message 
            });
        })
})

//DELETE /posts/:id
exports.destroy = (async (req, res, next) => {
    await Post.deleteOne({ _id: req.params.id})
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Xóa bài viết thành công.',
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false, 
                message: err.message 
            });
        })

})


//GET /posts/admin
exports.adminGetAll = (async (req, res, next) => {
    Post.find({})
        .then(posts => {
            res.status(200).json({
                success: true,
                posts
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false, 
                message: err.message 
            });
        })
})

//DELETE /posts/admin/:id
exports.adminDestroy = (async (req, res, next) => {
    Post.deleteOne({ _id: req.params.id})
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Xóa bài viết thành công.',
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false, 
                message: err.message 
            });
        })

})