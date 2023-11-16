const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post_stored = new Schema({
    post_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Post_stored', Post_stored);