const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Follow = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    follower_user_id: {
        type: String,
        required: true,
    },
    following_user_id: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Follow', Follow);