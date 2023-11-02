const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    post_id: {
        type: String,
        required: true,
    },
    comment_content: {
        type: String,
        required: true,
    },
    create_comment_time: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Comment', Comment);