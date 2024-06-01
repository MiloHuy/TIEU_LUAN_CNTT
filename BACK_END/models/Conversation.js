const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Conversation = new Schema({
    participates: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    last_message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: null,
    },
    last_time: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Conversation", Conversation);
