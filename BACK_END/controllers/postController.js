const Post = require('../models/post')

// Get all posts   =>   /posts
exports.getPosts = (async (req, res, next) => {

    // const apiFeatures = new APIFeatures(Post.find(), req.query)
    //     .search()
    //     .filter()

    // posts = await apiFeatures.query;

    // res.status(200).json({
    //     success: true,
    //     posts
    // })

    res.send('Hello World!')

})