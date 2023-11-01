const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    pass_word: {
        type: String,
    },
    birth_day: {
        type: String,
    },
    gender: {
        type: String,
    },
    gmail: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    id: {
        type: String,
    },
    department: {
        type: String,
    },
    role_id: {
        type: String,
    },
    is_active: {
        type: String,
    },
    avatar: {
        type: String,
    },
})

module.exports = mongoose.model('User', User);