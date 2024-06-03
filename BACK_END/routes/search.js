const express = require('express');
const router = express.Router();

const {
    search,
} = require('../controllers/searchController.js');

const {
    verifyToken,
    isUser,
    isAdmin,
} = require('../middlewares/authMiddleware.js');

router.get('/', verifyToken, isUser, search);



module.exports = router;