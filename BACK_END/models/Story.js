const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Story = new Schema({
    user_id: {
        type: String,
    },
    post_description: {
        type: String,
    },
    post_img: {
        type: String,
    },
    create_post_time: {
        type: String,
    },
})

module.exports = mongoose.model('Story', Story);