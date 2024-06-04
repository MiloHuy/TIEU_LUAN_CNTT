const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Group = new Schema({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        publicId: {
            type: String,
        },
        url: {
            type: String,
            default:
                "https://nhadepso.com/wp-content/uploads/2023/03/cap-nhat-50-hinh-anh-dai-dien-facebook-mac-dinh-dep-doc-la_17.jpg",
        },
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    member: [
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            is_active: {type:Boolean, default: true},
        },
    ],
    admin: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            role_permisson: {
                role: {
                    type: String,
                    default: "admin",
                    required: true,
                },
                permission: {
                    See: {
                        GET: {
                            group_info: {
                                type: String,
                                default: "group/:gr_id/info",
                            },
                            group_regulation: {
                                type: String,
                                default: "group/:gr_id/regulation",
                            },
                            posts: {
                                type: String,
                                default: "group/:gr_id/posts",
                            },
                            post: {
                                type: String,
                                default: "group/:gr_id/post/:post_id",
                            },
                            my_posts: {
                                type: String,
                                default: "group/:gr_id/my-posts",
                            },
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
                    Post: {
                        POST: {
                            post: {
                                type: String,
                                default: "group/:gr_id/admin/post/create",
                            },
                        },
                        DELETE: {
                            post: {
                                type: String,
                                default: "group/:gr_id/member/post/:post_id",
                            },
                        },
                    },
                    Invite: {
                        POST: {
                            invite: {
                                type: String,
                                default:
                                    "group/:gr_id/admin/invite-user/:user_id",
                            },
                        },
                    },
                    Manage_member: {
                        GET: {
                            members: {
                                type: String,
                                default: "group/:gr_id/admin/members",
                            },
                            request_join: {
                                type: String,
                                default: "group/:gr_id/admin/request-join",
                            },
                        },
                        POST: {
                            accept_request: {
                                type: String,
                                default:
                                    "group/:gr_id/admin/accept-request/:user_id",
                            },
                        },
                        PUT: {
                            edit_active: {
                                type: String,
                                default:
                                    "group/:gr_id/admin/edit-active/:user_id",
                            },
                        },
                        DELETE: {
                            delete_member: {
                                type: String,
                                default:
                                    "group/:gr_id/admin/delete_member/:user_id",
                            },
                        },
                    },
                    Manage_post: {
                        GET: {
                            posts: {
                                type: String,
                                default: "group/:gr_id/admin/posts",
                            },
                            queue_post: {
                                type: String,
                                default: "group/:gr_id/admin/posts/queue",
                            },
                            report: {
                                type: String,
                                default: "group/:gr_id/admin/posts/report",
                            },
                        },
                        POST: {
                            approve_post: {
                                type: String,
                                default:
                                    "group/:gr_id/admin/posts/approve/:post_id",
                            },
                        },
                        DELETE: {
                            delete_post: {
                                type: String,
                                default: "group/:gr_id/admin/posts/:post_id",
                            },
                        },
                    },
                    Manage_interact: {
                        GET: {
                            statistic_member: {
                                type: String,
                                default: "group/:gr_id/admin/statistic/members",
                            },
                            statistic_post: {
                                type: String,
                                default: "group/:gr_id/admin/statistic/posts",
                            },
                            statistic_cmt: {
                                type: String,
                                default:
                                    "group/:gr_id/admin/statistic/comments",
                            },
                            statistic_like: {
                                type: String,
                                default: "group/:gr_id/admin/statistic/likes",
                            },
                        },
                    },
                    Manage_regulation: {
                        PUT: {
                            regulation: {
                                type: String,
                                default: "group/:gr_id/admin/regulation",
                            },
                        },
                    },
                },
            },
            is_active: {type:Boolean, default: true}
        },
    ],
    super_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    privacy: {
        type: Number,
        default: 2, // 1: private
        enum: [1, 2], // 2: public
    },
    regulation: [{
        type: String,
    }],
    list_report: [
        {
            post_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            reason: {
                type: String,
            },
            create_report_time: {
                type: Date,
                required: true,
            },
        },
    ],
    request_join: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        },
    ],
    approve_post : {type:Boolean, default: true},
});

module.exports = mongoose.model("Group", Group);
