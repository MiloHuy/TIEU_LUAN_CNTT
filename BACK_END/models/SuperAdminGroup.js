const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuperAdminGroup = new Schema({
    role: {
        type: String,
        default: "super-admin",
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
            GET: {
                comment: { type: String, default: "group/:gr_id/post/comment/:post_id" }
            },
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
                post: { type: String, default: 'group/:gr_id/member/post/:post_id' }
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
                delete_post: { type: String, default: 'group/:gr_id/admin/posts/:post_id' }
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
        Manage_admin: {
            POST: {
                add_admin: { type: String, default: 'group/:gr_id/super-admin/add-admin/:user_id' },
            },
            GET: {
                admins: { type: String, default: 'group/:gr_id/super-admin/admins' },
                admin_permission: { type: String, default: 'group/:gr_id/super-admin/admins/permission/:user_id' },
                search: { type: String, default: 'group/:gr_id/super-admin/admins/search' },
            },
            PUT: {
                edit_active: { type: String, default: 'group/:gr_id/super-admin/edit-active/:user_id' },
                edit_permission: { type: String, default: 'group/:gr_id/super-admin/edit-permission/:user_id' },
            },
            DELETE: {
                delete_admin: { type: String, default: 'group/:gr_id/super-admin/delete-admin/:user_id' }
            }
        },
        Manage_regulation: {
            PUT: {
                edit_regulation: { type: String, default: 'group/:gr_id/admin/regulation' },
            }
        },
        Edit:{
            POST:{
                avatar: { type: String, default: 'group/:gr_id/super-admin/avatar' },
            },
            PUT:{
                setting: { type: String, default: 'group/:gr_id/super-admin/setting' },
            }
        },
        Leave_Group: {
            POST: {
                leave_group: { type: String, default: "group/:gr_id/super-admin/leave" }, 
            }
        },
    }
});

module.exports = mongoose.model('SuperAdminGroup', SuperAdminGroup);