const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Story = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    story_content: {
        type: String,
        required: true,
    },
    create_story_time: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Story', Story);