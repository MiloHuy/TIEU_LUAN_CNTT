const express = require('express');
const router = express.Router();

const {
    getInfo,
    getAll,
    disabled ,
} = require('../controllers/userController.js');

const {
    verifyToken,
    isUser,
    isAdmin,
} = require('../middlewares/authMiddleware.js');

router.get('/info/:id', verifyToken, isUser, getInfo);

router.get('/admin', verifyToken, isAdmin, getAll);
router.delete('/admin/:id', verifyToken, isAdmin, disabled);



module.exports = router;