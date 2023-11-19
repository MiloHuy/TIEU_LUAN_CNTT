const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Addfriend = new Schema({
    addfriend:{
        user_id: {
            type: String,
            required: true,
        },
        add_user_id: {
            type: String,
            required: true,
        }
    }
})

module.exports = mongoose.model('Addfriend', Addfriend);