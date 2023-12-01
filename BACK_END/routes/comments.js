const express = require('express');
const router = express.Router();

const {
    getComments,
    create,
} = require('../controllers/commentController.js');

const {
    verifyToken,
    isUser,
    isAdmin
} = require('../middlewares/authMiddleware.js');

router.get('/:id', verifyToken, isUser, getComments);
router.post('/create/:id', verifyToken, isUser, create);
//router.put('/:id', verifyToken, isUser, update);





module.exports = router;