const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Follow = new Schema({
    user_id: {
        type: String,
        unique: true,
    },
    following_user_id: [{
        type: String,
    }],
    follower_user_id: [{
        type: String,
    }],
})

module.exports = mongoose.model('Follow', Follow);