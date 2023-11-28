const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Friend = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    friend_id: [{
        type: String,
    }],
})

module.exports = mongoose.model('Friend', Friend);