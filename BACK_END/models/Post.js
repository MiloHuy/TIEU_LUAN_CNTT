const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post_description: {
        type: String,
    },
    post_img: [
        {
            publicId: {
                type: String,
            },
            url: {
                type: String,
            },
        },
    ],
    privacy: {
        type: Number,
        default : 1,
        enum: [0, 1, 2],
        // 0 : private
        // 1 : follower
        // 2 : public
    },
    group_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
    },
    create_post_time: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("Post", Post);
