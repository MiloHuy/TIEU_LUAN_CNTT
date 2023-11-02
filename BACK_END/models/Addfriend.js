const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Addfriend = new Schema({
    user_id: {
        type: String,
    },
    add_user_id: {
        type: String,
    },
})

module.exports = mongoose.model('Addfriend', Addfriend);