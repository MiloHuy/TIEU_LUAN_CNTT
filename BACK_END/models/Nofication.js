const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Nofication = new Schema({
    user_id: {
        type: String,
    },
    nofi_content: {
        type: String,
    },
    nofi_create_time: {
        type: String,
    },
})

module.exports = mongoose.model('Nofication', Nofication);