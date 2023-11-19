const express = require('express');
const router = express.Router();

const {
    follow,
    addfriend,
    accept,
    refuse,
    unfriend,
    block,
} = require('../controllers/interactController.js');

const {
    verifyToken,
    isUser,
} = require('../middlewares/authMiddleware.js');

router.post('/follow/:id', verifyToken, isUser, follow);
router.post('/addfriend', verifyToken, isUser, addfriend);
router.post('/accept', verifyToken, isUser, accept);
router.post('/refuse', verifyToken, isUser, refuse);
router.post('/unfriend', verifyToken, isUser, unfriend);
router.post('/block', verifyToken, isUser, block);

module.exports = router;