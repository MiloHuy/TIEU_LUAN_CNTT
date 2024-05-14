const express = require('express');
const router = express.Router();

const {
    create,
    getRolePermission,
    inviteUser,
    addAdmin,
    getInfo,
    getMembers,
    requestJoin,
    getRegulation,
    adminGetRequestJoin,
    adminAcceptRequest,
    adminRefuseRequest,
    leaveGroup,
    getGroup,
    getGroupAdmin,
    getGroupSuperAdmin,
    adminGetMembers,
    adminEditActive,
    adminDeleteUser,
    createPost,
    adminGetQueuePost,
    adminApprovePost,
    getPosts,
    adminGetAllPosts,
    getMyPosts,
    getPost,
    adminDeletePost,
    SuperAdminDeletePost,
    likePost,
} = require('../controllers/groupController.js');

const {
    verifyToken,
    isUser,
} = require('../middlewares/authMiddleware.js');
const { isAdminGroup, isSuperAdminGroup } = require('../middlewares/groupMiddleware.js');

// All
router.post('/create', verifyToken, isUser, create);
router.get('/:gr_id/get-role-permission', verifyToken, isUser, getRolePermission);
router.get('/:gr_id/info', verifyToken, isUser, getInfo);
router.get('/:gr_id/members', verifyToken, isUser, getMembers);
router.post('/:gr_id/guest/request-join', verifyToken, isUser, requestJoin);
router.get('/:gr_id/regulation', verifyToken, isUser, getRegulation);
router.get('/:gr_id/post', verifyToken, isUser, getPosts);
router.get('/:gr_id/post/:post_id', verifyToken, isUser, getPost);
router.post('/:gr_id/post/like/:post_id', verifyToken, isUser, likePost);

// Member, Ad, Super
router.get('/:gr_id/my-posts', verifyToken, isUser, getMyPosts);

router.post('/:gr_id/member/leave', verifyToken, isUser, leaveGroup);
router.post('/:gr_id/member/post/create', verifyToken, isUser, createPost);

router.post('/:gr_id/admin/invite-user/:user_id', verifyToken, isUser, isAdminGroup, inviteUser);
router.get('/:gr_id/admin/request-join', verifyToken, isUser, isAdminGroup, adminGetRequestJoin);
router.post('/:gr_id/admin/accept-request/:user_id', verifyToken, isUser, isAdminGroup, adminAcceptRequest);
router.post('/:gr_id/admin/refuse-request/:user_id', verifyToken, isUser, isAdminGroup, adminRefuseRequest);
router.get('/:gr_id/admin/members', verifyToken, isUser, isAdminGroup, adminGetMembers);
router.put('/:gr_id/admin/edit-active/:user_id', verifyToken, isUser, isAdminGroup, adminEditActive);
router.delete('/:gr_id/admin/delete-member/:user_id', verifyToken, isUser, isAdminGroup, adminDeleteUser);

router.get('/:gr_id/admin/posts', verifyToken, isUser, isAdminGroup, adminGetAllPosts);
router.get('/:gr_id/admin/posts/queue', verifyToken, isUser, isAdminGroup, adminGetQueuePost);
router.post('/:gr_id/admin/posts/approve/:post_id', verifyToken, isUser, isAdminGroup, adminApprovePost);
router.delete('/:gr_id/admin/posts/:post_id', verifyToken, isUser, isAdminGroup, adminDeletePost);

router.post('/:gr_id/super-admin/add-admin/:user_id', verifyToken, isUser, isSuperAdminGroup, addAdmin);
router.delete('/:gr_id/super-admin/posts/:post_id', verifyToken, isUser, isAdminGroup, SuperAdminDeletePost);

router.get('/all', verifyToken, isUser, getGroup);
router.get('/admin', verifyToken, isUser, getGroupAdmin);
router.get('/super-admin', verifyToken, isUser, getGroupSuperAdmin);

module.exports = router;