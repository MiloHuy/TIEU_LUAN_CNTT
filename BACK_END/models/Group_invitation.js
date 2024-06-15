const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Group_invitation = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    invitation: [{
        group_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    }],
});

module.exports = mongoose.model("Group_invitation", Group_invitation);
