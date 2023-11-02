const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post_like = new Schema({
    post_id: {
        type: String,
    },
    user_id: {
        type: String,
    },
})

module.exports = mongoose.model('Post_like', Post_like);