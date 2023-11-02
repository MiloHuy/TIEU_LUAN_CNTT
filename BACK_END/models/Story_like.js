const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Story_like = new Schema({
    story_id: {
        type: String,
    },
    user_id: {
        type: String,
    },
})

module.exports = mongoose.model('Story_like', Story_like);