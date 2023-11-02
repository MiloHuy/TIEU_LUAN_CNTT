const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Nofi_user = new Schema({
    nofi_id: {
        type: String,
    },
    status: {
        type: String,
    },
    friend_id: {
        type: String,
    },
})

module.exports = mongoose.model('Nofi_user', Nofi_user);