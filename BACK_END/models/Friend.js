const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Friend = new Schema({
    user_id: {
        type: String,
    },
    friend_id: {
        type: String,
    },
})

module.exports = mongoose.model('Friend', Friend);