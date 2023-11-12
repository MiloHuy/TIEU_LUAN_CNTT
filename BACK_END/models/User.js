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
        type: Date,
    },
    gender: {
        type: String,
    },
    gmail: {
        type: String,
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
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
        type: Number,
        default: 1,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    avatar: {
        type: String,
        default: "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg",
    },
})

module.exports = mongoose.model('User', User);