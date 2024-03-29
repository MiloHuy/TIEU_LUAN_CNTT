const express = require('express');
const router = express.Router();

const {
    register,
    login,
    refreshToken,
    logout,
    forgotPassword,
    verifyOTP,
    resetPassword,
    sendRegisterOtp,
    getDepartment,
} = require('../controllers/authController.js');

router.get('/departments', getDepartment);
router.post('/register', register);
router.post('/register/send-otp', sendRegisterOtp);
router.post('/refresh-token', refreshToken);
router.post('/login', login);
router.post('/logout', logout);

router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password/:token', resetPassword);

module.exports = router;