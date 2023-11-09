const express = require('express');
const router = express.Router();

const {
    getAll,
    getPost,
    store,
    update,
    destroy,
    adminGetAll,
    adminDestroy,
} = require('../controllers/postController.js');

const {
    verifyToken,
    isUser,
    isAdmin
} = require('../middlewares/authMiddleware.js');

router.get('/:id', verifyToken, isUser, getPost);
router.post('/store', verifyToken, isUser, store);
router.put('/:id', verifyToken, isUser, update);
router.delete('/:id', verifyToken, isUser, destroy);

router.get('/admin/get', verifyToken, isAdmin, adminGetAll);
router.delete('/admin/:id', verifyToken, isAdmin, adminDestroy);

router.get('/', verifyToken, isUser, getAll);



module.exports = router;