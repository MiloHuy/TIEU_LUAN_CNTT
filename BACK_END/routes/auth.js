const express = require('express');
const router = express.Router();

const {
    register,
    login,
    refreshToken,
    logout,
} = require('../controllers/authController.js');

router.post('/register', register);
router.post('/refresh-token', refreshToken);
router.post('/login', login);

router.post('/logout', logout);

module.exports = router;