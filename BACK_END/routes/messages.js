const express = require('express');
const router = express.Router();

const {
    sendMessage,
    getMessages,
    getConversations
} = require('../controllers/messageController.js');

const {
    verifyToken,
    isUser,
} = require('../middlewares/authMiddleware.js');

const {
    findReceiver,
    findConversation
} = require('../middlewares/messageMiddleware.js');

router.post('/:id', verifyToken, isUser, findReceiver, sendMessage);
router.get('/:conversation_id', verifyToken, isUser, findConversation, getMessages);
router.get('/', verifyToken, isUser, getConversations);
// router.post('/like/:id', verifyToken, isUser, like);





module.exports = router;