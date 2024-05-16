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
                }
            },
        },
        Interact: {
            GET: {
                comment: { type: String, default: "group/:gr_id/post/comment/:post_id" }
            },
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
            GET: {
                posts: { type: String, default: "group/:gr_id/posts" },
                post: { type: String, default: "group/:gr_id/post/:post_id" },
                my_posts: { type: String, default: "group/:gr_id/my-posts" }
            },
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
        Post_wait_approve: {
            GET: {
                posts: { type: String, default: "group/:gr_id/member/post_wait_approve" },
            },
            PUT: {
                post: {
                    type: String,
                    default: "group/:gr_id/member/post_wait_approve/:post_id",
                }, 
            },
            DELETE: {
                post: {
                    type: String,
                    default: "group/:gr_id/member/post/:post_id",
                }, 
            },
        },
        Leave_Group: {
            POST: {
                leave_group: {
                    type: String,
                    default: "group/:gr_id/member/leave",
                }, 
            },
        },
    },
});

module.exports = mongoose.model("MemberGroup", MemberGroup);
