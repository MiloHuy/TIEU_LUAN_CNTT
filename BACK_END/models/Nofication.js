const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Nofication = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    nofi_content: {
        type: String,
        required: true,
    },
    nofi_create_time: {
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('Nofication', Nofication);