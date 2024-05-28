const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = new Schema({
    conversation_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Conversation",
    },
    content: {
        type: String,
        required: true,
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    viewed: {
        type: Boolean,
        default: false,
    },
    create_message_time: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Message", Message);
