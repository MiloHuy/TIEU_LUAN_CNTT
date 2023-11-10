const express = require('express');
const router = express.Router();

const {
    getMyPosts,
    getPosts,
    getStories,
    updateInfo,
    updatePassword,
} = require('../controllers/meController.js');

const {
    verifyToken,
    isUser,
} = require('../middlewares/authMiddleware.js');

router.get('/myposts', verifyToken, isUser, getMyPosts);
router.get('/stored/posts', verifyToken, isUser, getPosts);
router.get('/stored/stories', verifyToken, isUser, getStories);
router.put('/account/info', verifyToken, isUser, updateInfo);
router.put('/account/password', verifyToken, isUser, updatePassword);



module.exports = router;