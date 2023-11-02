const express = require('express');
const router = express.Router();

const {
    getPosts,
    getStories,
    editInfo,
    updateInfo,
    editPassword,
    updatePassword,
    logout,
} = require('../controllers/meController.js');

router.get('/stored/posts', getPosts);
router.get('/stored/stories', getStories);
router.get('/account/edit/info', editInfo);
router.put('/account/info', updateInfo);
router.get('/account/edit/password', editPassword);
router.put('/account/password', updatePassword);
router.post('/account', logout);



module.exports = router;