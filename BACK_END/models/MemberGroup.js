const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberGroup = new Schema({
    role: {
        type: String,
        default: "member",
        required: true,
    },
    permission: {
        See: {
            GET: {
                group_info: { type: String, default: "group/:gr_id/info" },
                members: { type: String, default: 'group/:gr_id/members' },
                group_regulation: {
                    type: String,
                    default: "group/:gr_id/regulation",
                },
                posts: { type: String, default: "group/:gr_id/posts" },
                post: { type: String, default: "group/:gr_id/post/:post_id" },
            },
        },
        Interact: {
            POST: {
                like_post: {
                    type: String,
                    default: "group/:gr_id/post/like/:post_id",
                },
                comment_post: {
                    type: String,
                    default: "group/:gr_id/post/comment/:post_id",
                },
                save_post: {
                    type: String,
                    default: "group/:gr_id/post/save/:post_id",
                },
            },
        },
        Report: {
            POST: {
                post: {
                    type: String,
                    default: "group/:gr_id/member/report/post/:post_id",
                },
            },
        },
        Post: {
            POST: {
                post: {
                    type: String,
                    default: "group/:gr_id/member/post/create",
                }, 
            },
            DELETE: {
                post: {
                    type: String,
                    default: "group/:gr_id/member/post/:post_id",
                }, 
            },
        },
    },
});

module.exports = mongoose.model("MemberGroup", MemberGroup);
