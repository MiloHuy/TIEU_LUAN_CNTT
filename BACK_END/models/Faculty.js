const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Faculty = new Schema({
    name: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Faculty', Faculty);