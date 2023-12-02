const express = require('express');
const router = express.Router();

const {
    getStatistics,
} = require('../controllers/statisticsController.js');

const {
    verifyToken,
    isUser,
    isAdmin
} = require('../middlewares/authMiddleware.js');

router.get('/:id', verifyToken, isUser, getStatistics);

module.exports = router; 