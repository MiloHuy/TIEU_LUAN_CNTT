const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    pass_word: {
        type: String,
        required: true,
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
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true,
    },
    role_id: {
        type: String,
        required: true,
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
    },
    avatar: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('User', User);