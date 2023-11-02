const Post = require('../models/Post')
const Story = require('../models/Story')
const Follow = require('../models/Follow')
const Friend = require('../models/Friend')

//GET /statistics

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

exports.getFollower = (async (req, res, next) => {

})

exports.getFollowing = (async (req, res, next) => {

})

exports.getFriend = (async (req, res, next) => {

})