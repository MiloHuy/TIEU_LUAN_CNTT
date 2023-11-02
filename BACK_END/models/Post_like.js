const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post_like = new Schema({
    post_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Post_like', Post_like);