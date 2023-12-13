const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const bcrypt = require('bcrypt');

const { 
    sendToken,
    getRefreshToken,
    deleteToken,
    clearToken,
    getNextRefreshToken
} = require('../utils/tokenUtils.js');

exports.register = (async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.pass_word, 10);
        const newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            pass_word: hashedPassword,
            birth_day : req.body.birth_day,
            gender: req.body.gender,
            gmail: req.body.gmail,
            phone_number: req.body.phone_number,
            id: req.body.id,
            department : req.body.department,
        };
        const user = await User.create(newUser);
        res.status(201).json({
            success: true,
            message: 'Đăng ký thành công.',
            user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 1000,
            message: err.message 
        });
    }
})

exports.login = (async (req, res) => {
    const { phone_number, pass_word } = req.body;

    if (!phone_number || !pass_word) {
        return res.status(400).json({
            success: false,
            code: 1001,
            message: 'Đăng nhập thất bại. Vui lòng nhập số điện thoại và mật khẩu',
        });
    }

    const user = await User.findOne({ phone_number }).select('+pass_word');

    if (!user) {
        return res.status(401).json({
            success: false,
            code: 1002,
            message: 'Đăng nhập thất bại. Không tìm thấy người dùng. Vui lòng kiểm tra số điện thoại',
        });
    }

    const isPasswordMatched = await user.comparePassword(pass_word);
    if (!isPasswordMatched) {
        return res.status(401).json({
            success: false,
            code: 1003,
            message: 'Đăng nhập thất bại. Sai mật khẩu' 
        });
    }
    const refreshToken = await getRefreshToken(user);

    return sendToken(user, refreshToken, res);
});

exports.logout = (async (req, res) => {
    const token = req.cookies.refreshToken;

    if (token) {
        const refreshToken = await RefreshToken.findOne({ token });
        if (refreshToken) {
            const parent = refreshToken.parent || refreshToken._id;
            await deleteToken(parent);
        }

    }
    clearToken(res);

    res.json({
        success: true,
        message: 'Đăng xuất thành công'
    })
});

exports.refreshToken =(async (req, res) => {

    const token = req.cookies.refreshToken;
    if (!token) {
        return res.status(400).json({
            success: false,
            code: 1004,
            message: 'Cookies không có refreshToken' 
        });
    }

    const refreshToken = await RefreshToken.findOne({ token });

    if (!refreshToken) {
        try {
            const tokenEncoded = Buffer.from(token, 'base64url').toString();
            const tokenObject = JSON.parse(tokenEncoded);
            const parentToken = await RefreshToken.findById(tokenObject.p);
            const parent = parentToken.parent || parentToken._id;
            await deleteToken(parent);
            return res.status(400).json({
                success: false,
                code: 1005,
                message: 'Token đã được sử dụng' 
            });
        } catch {
            clearToken(res);
            return res.status(400).json({
                success: false,
                code: 1006,
                message: 'Token không tồn tại trong hệ thống' 
            });
        }
    }


    const parent = refreshToken.parent || refreshToken._id;
    if (!refreshToken.status) {
        await deleteToken(parent);
        clearToken(res);
        return res.status(400).json({
            success: false,
            code: 1007,
            message: 'Token đã được sử dụng' 
        });
    }

    const user = await User.findById(refreshToken.user);
    if (refreshToken.parent == null) {
        await RefreshToken.findByIdAndUpdate(refreshToken._id, { status: false });

    }
    await RefreshToken.deleteMany({ parent });

    const nextRefreshToken = await getNextRefreshToken(user._id, parent);

    return sendToken(user, nextRefreshToken, res);
})