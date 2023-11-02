const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Nofi_user = new Schema({
    nofi_id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    friend_id: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Nofi_user', Nofi_user);