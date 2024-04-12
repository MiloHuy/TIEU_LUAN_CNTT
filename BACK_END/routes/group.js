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
} = require('../controllers/groupController.js');

const {
    verifyToken,
    isUser,
} = require('../middlewares/authMiddleware.js');
const { isAdminGroup, isSuperAdminGroup } = require('../middlewares/groupMiddleware.js');


router.post('/create', verifyToken, isUser, create);

router.get('/:gr_id/get-role-permission', verifyToken, isUser, getRolePermission);

router.get('/:gr_id/info', verifyToken, isUser, getInfo);
router.get('/:gr_id/regulation', verifyToken, isUser, getRegulation);
router.get('/:gr_id/members', verifyToken, isUser, getMembers);
router.post('/:gr_id/guest/request-join', verifyToken, isUser, requestJoin);



router.post('/:gr_id/admin/invite-user/:user_id', verifyToken, isUser, isAdminGroup, inviteUser);

router.post('/:gr_id/super-admin/add-admin/:user_id', verifyToken, isUser, isSuperAdminGroup, addAdmin);


module.exports = router;