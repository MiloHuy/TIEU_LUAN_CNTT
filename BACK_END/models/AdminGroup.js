const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminGroup = new Schema({
    role: {
        type: String,
        default: "admin",
        required: true
    },
    permission: {
        See: {
            GET: {
                group_info: { type: String, default: 'group/:gr_id/info' },
                members: { type: String, default: 'group/:gr_id/members' },
                group_regulation: { type: String, default: 'group/:gr_id/regulation' }
            }
        },
        Interact: {
            POST: {
                like_post: { type: String, default: 'group/:gr_id/post/like/:post_id' },
                comment_post: { type: String, default: 'group/:gr_id/post/comment/:post_id' },
                save_post: { type: String, default: 'group/:gr_id/post/save/:post_id' }
            }
        },
        Post: {
            GET: {
                posts: { type: String, default: "group/:gr_id/posts" },
                post: { type: String, default: "group/:gr_id/post/:post_id" },
                my_posts: { type: String, default: "group/:gr_id/my-posts" }
            },
            POST: {
                post: { type: String, default: 'group/:gr_id/admin/post/create' }
            },
            DELETE: {
                post: { type: String, default: 'group/:gr_id/member/post/:post_id' } // my post
            }
        },
        Invite: {
            POST: {
                invite: { type: String, default: 'group/:gr_id/admin/invite-user/:user_id' }
            }
        },
        Manage_member: {
            GET: {
                members: { type: String, default: 'group/:gr_id/admin/members' },
                request_join: { type: String, default: 'group/:gr_id/admin/request-join' }
            },
            POST: {
                accept_request: { type: String, default: 'group/:gr_id/admin/accept-request/:user_id' },
                refuse_request: { type: String, default: 'group/:gr_id/admin/refuse-request/:user_id' }
            },
            PUT: {
                edit_active: { type: String, default: 'group/:gr_id/admin/edit-active/:user_id' }
            },
            DELETE: {
                delete_member: { type: String, default: 'group/:gr_id/admin/delete_member/:user_id' }
            }
        },
        Manage_post: {
            GET: {
                posts: { type: String, default: 'group/:gr_id/admin/posts' },
                queue_post: { type: String, default: 'group/:gr_id/admin/posts/queue' },
                report: { type: String, default: 'group/:gr_id/admin/posts/report' }
            },
            POST: {
                approve_post: { type: String, default: 'group/:gr_id/admin/posts/approve/:post_id' }
            },
            DELETE: {
                delete_post: { type: String, default: 'group/:gr_id/admin/posts/:post_id' } // "Bài viết của bạn đã bị admin xóa"
            }
        },
        Manage_interact: {
            GET: {
                statistic_member: { type: String, default: 'group/:gr_id/admin/statistic/members' },
                statistic_post: { type: String, default: 'group/:gr_id/admin/statistic/posts' },
                statistic_cmt: { type: String, default: 'group/:gr_id/admin/statistic/comments' },
                statistic_like: { type: String, default: 'group/:gr_id/admin/statistic/likes' }
            }
        },
        Manage_regulation: {
            PUT: {
                regulation: { type: String, default: 'group/:gr_id/admin/regulation' }
            }
        },
        Leave_Group: {
            POST: {
                leave_group: {
                    type: String,
                    default: "group/:gr_id/member/leave",
                }, 
            },
        },
    }
});

module.exports = mongoose.model('AdminGroup', AdminGroup);