const Story = require('../models/Story')

//GET /stories
exports.getAll = (async (req, res, next) => {

    Story.find({})
        .then(stories => {
            res.json(posts)
            res.status(200).json({
                success: true,
                stories
            })
        })
        .catch(next)

})

//GET /stories/:id
exports.getStory = (async (req, res, next) => {

    Story.findById(req.params.id)
        .then(story => {
            res.json(post)
            res.status(200).json({
                success: true,
                story
            })
        })
        .catch(next)

})

//GET /stories/create
exports.create = (async (req, res, next) => {

    res.send('Hello World!')

})

//POST /stories/store
exports.store = (async (req, res, next) => {

    res.send('Hello World!')

})

//GET /stories/:id/edit
exports.edit = (async (req, res, next) => {

    res.send('Hello World!')

})

//PUT /stories/:id
exports.update = (async (req, res, next) => {

    res.send('Hello World!')

})

//DELETE /stories/:id
exports.destroy = (async (req, res, next) => {
    Post.delete({ _id: req.params.id})
      .then(() => res.redirect('back'))
      .catch(next)

})