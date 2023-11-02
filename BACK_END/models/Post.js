const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    post_description: {
        type: String,
        required: true,
    },
    post_img: {
        type: String,
        required: true,
    },
    create_post_time: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Post', Post);