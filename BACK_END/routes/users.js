const express = require('express');
const router = express.Router();

const {
    getInfo,
    getAllUser,
    getAll,
    disabled ,
} = require('../controllers/userController.js');

const {
    verifyToken,
    isUser,
    isAdmin,
} = require('../middlewares/authMiddleware.js');

router.get('/search', verifyToken, isUser, getAllUser);
router.get('/info/:id', verifyToken, isUser, getInfo);

router.get('/admin', verifyToken, isAdmin, getAll);
router.delete('/admin/:id', verifyToken, isAdmin, disabled);



module.exports = router;