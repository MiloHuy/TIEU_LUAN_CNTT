const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = new Schema({
    user_id: {
        type: String,
    },
    post_id: {
        type: String,
    },
    comment_content: {
        type: String,
    },
    create_comment_time: {
        type: String,
    },
})

module.exports = mongoose.model('Comment', Comment);