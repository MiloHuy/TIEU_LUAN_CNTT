const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Story = new Schema({
    user_id: {
        type: String,
    },
    story_content: {
        type: String,
    },
    create_story_time: {
        type: String,
    },
})

module.exports = mongoose.model('Story', Story);