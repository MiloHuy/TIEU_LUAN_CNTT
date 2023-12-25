const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
        publicId: {
            type: String,
        },
        url: {
            type: String,
            default: "https://nhadepso.com/wp-content/uploads/2023/03/cap-nhat-50-hinh-anh-dai-dien-facebook-mac-dinh-dep-doc-la_17.jpg",
            
        },
    },
})

User.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.pass_word);
}

User.methods.getAccessToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
        expiresIn: '5m'
    });
}

module.exports = mongoose.model('User', User);

