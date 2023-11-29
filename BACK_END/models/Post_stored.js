const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post_stored = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    post_id: [{
        type: String,
    }],
})

module.exports = mongoose.model('Post_stored', Post_stored);