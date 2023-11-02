const Post = require('../models/Post')
const Story = require('../models/Story')

//GET /statistics/posts
exports.getPosts = (async (req, res, next) => {

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

//GET /statistics/stories
exports.getStories = (async (req, res, next) => {

    Story.find({})
        .then(posts => {
            res.json(posts)
            res.status(200).json({
                success: true,
                posts
            })
        })
        .catch(next)

})