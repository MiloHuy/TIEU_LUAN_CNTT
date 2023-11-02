const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment_like = new Schema({
    comment_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Comment_like', Comment_like);