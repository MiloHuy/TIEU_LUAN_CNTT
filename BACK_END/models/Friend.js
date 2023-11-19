const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Friend = new Schema({
    user_friend:{
        user_id: {
            type: String,
            required: true,
        },
        friend_id: {
            type: String,
            required: true,
        },
    }
})

module.exports = mongoose.model('Friend', Friend);