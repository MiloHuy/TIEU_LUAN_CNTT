const Post = require('../models/Post')

//GET /posts
exports.getAll = (async (req, res, next) => {

    Post.find({})
        .then(posts => {
            res.json(posts)
            res.status(200).json({
                success: true,
                posts
            })
        })
        .catch(next)

})

//GET /posts/:id
exports.getPost = (async (req, res, next) => {

    Post.findById(req.params.id)
        .then(post => {
            res.json(post)
            res.status(200).json({
                success: true,
                post
            })
        })
        .catch(next)

})

//GET /posts/create
exports.create = (async (req, res, next) => {

    res.send('Hello World!')

})

//POST /posts/store
exports.store = (async (req, res, next) => {

    res.send('Hello World!')

})

//GET /posts/:id/edit
exports.edit = (async (req, res, next) => {

    res.send('Hello World!')

})

//PUT /posts/:id
exports.update = (async (req, res, next) => {

    res.send('Hello World!')

})

//DELETE /posts/:id
exports.destroy = (async (req, res, next) => {
    Post.delete({ _id: req.params.id})
      .then(() => res.redirect('back'))
      .catch(next)

})


//GET /posts/admin
exports.adminGetAll = (async (req, res, next) => {

    Post.find({})
        .then(posts => {
            res.json(posts)
            res.status(200).json({
                success: true,
                posts
            })
        })
        .catch(next)

})

//DELETE /posts/admin/:id
exports.adminDestroy = (async (req, res, next) => {
    Post.delete({ _id: req.params.id})
      .then(() => res.redirect('back'))
      .catch(next)

})