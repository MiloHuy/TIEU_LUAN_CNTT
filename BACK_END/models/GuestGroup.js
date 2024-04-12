const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuestGroup = new Schema({
    role: {
        type: String,
        default: "guest",
        required: true
    },
    permission: {
        See: {
            GET: {
                group_info: { type: String, default: 'group/:gr_id/info' },
                members: { type: String, default: 'group/:gr_id/members' },
                group_regulation: { type: String, default: 'group/:gr_id/regulation' },
                posts: { type: String, default: 'group/:gr_id/posts' },
                post: { type: String, default: 'group/:gr_id/post/:post_id' },
            }
        },
        Request: {
            POST: {
                join: { type: String, default: 'group/:gr_id/guest/request-join' },
            },
        },
        Interact: {
            POST: {
                like_post: { type: String, default: 'group/:gr_id/post/like/:post_id' },
                comment_post: { type: String, default: 'group/:gr_id/post/comment/:post_id' },
                save_post: { type: String, default: 'group/:gr_id/post/save/:post_id' }
            }
        }
    }
});

module.exports = mongoose.model('GuestGroup', GuestGroup);