const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const {
    sendToken,
    getRefreshToken,
    deleteToken,
    clearToken,
    getNextRefreshToken,
} = require("../utils/tokenUtils.js");

const { sendVerificationEmail } = require("../utils/authUtils.js");
const { generateOTP } = require("../utils/authUtils.js");
const Register_otp = require("../models/Register_otp.js");

exports.register = async (req, res) => {
    try {
        const registerOtp = await Register_otp.findOne({
            gmail: req.body.gmail,
        });
        if (!registerOtp) {
            return res.status(404).json({
                success: false,
                code: 1018,
                message: "Gmail chưa được gửi OTP.",
            });
        }
        if (req.body.otp != registerOtp.otp) {
            return res.status(400).json({
                success: false,
                code: 1019,
                message: "OTP không đúng.",
            });
        }
        if (registerOtp.otp_expires_at < Date.now()) {
            return res.status(400).json({
                success: false,
                code: 1020,
                message: "OTP hết hạn. Hãy yêu cầu gửi lại OTP",
            });
        }

        const check_phone = await User.findOne({ phone_number: req.body.phone_number });
        if (check_phone) {
            return res.status(400).json({
                success: false,
                code: 1021,
                message: "Số điện thoại đã được đăng ký.",
            });
        }
        const check_id = await User.findOne({ id: req.body.id });
        if (check_id) {
            return res.status(400).json({
                success: false,
                code: 2022,
                message: "Mã số sinh viên đã được đăng ký.",
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.pass_word, 10);
        const newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            pass_word: hashedPassword,
            birth_day: req.body.birth_day,
            gender: req.body.gender,
            gmail: req.body.gmail,
            phone_number: req.body.phone_number,
            id: req.body.id,
            department: req.body.department,
        };

        await registerOtp.deleteOne();

        const user = await User.create(newUser);
        res.status(201).json({
            success: true,
            message: "Đăng ký thành công.",
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            code: 1000,
            message: err.message,
        });
    }
};

exports.login = async (req, res) => {
    const { phone_number, pass_word } = req.body;

    if (!phone_number || !pass_word) {
        return res.status(400).json({
            success: false,
            code: 1001,
            message:
                "Đăng nhập thất bại. Vui lòng nhập số điện thoại và mật khẩu",
        });
    }

    const user = await User.findOne({ phone_number });

    if (!user) {
        return res.status(400).json({
            success: false,
            code: 1002,
            message:
                "Đăng nhập thất bại. Không tìm thấy người dùng. Vui lòng kiểm tra số điện thoại",
        });
    }

    if (!user.is_active) {
        return res.status(400).json({
            success: false,
            code: 1008,
            message: "Đăng nhập thất bại. Tài khoản đã bị vô hiệu",
        });
    }

    const isPasswordMatched = await user.comparePassword(pass_word);
    if (!isPasswordMatched) {
        return res.status(400).json({
            success: false,
            code: 1003,
            message: "Đăng nhập thất bại. Sai mật khẩu",
        });
    }

    const refreshToken = await getRefreshToken(user);

    return sendToken(user, refreshToken, res);
};

exports.logout = async (req, res) => {
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
        message: "Đăng xuất thành công",
    });
};

exports.refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        return res.status(400).json({
            success: false,
            code: 1004,
            message: "Cookies không có refreshToken",
        });
    }

    const refreshToken = await RefreshToken.findOne({ token });

    if (!refreshToken) {
        try {
            const tokenEncoded = Buffer.from(token, "base64url").toString();
            const tokenObject = JSON.parse(tokenEncoded);
            const parentToken = await RefreshToken.findById(tokenObject.p);
            const parent = parentToken.parent || parentToken._id;
            await deleteToken(parent);
            return res.status(400).json({
                success: false,
                code: 1005,
                message: "Token đã được sử dụng",
            });
        } catch {
            clearToken(res);
            return res.status(404).json({
                success: false,
                code: 1006,
                message: "Token không tồn tại trong hệ thống",
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
            message: "Token đã được sử dụng",
        });
    }

    const user = await User.findById(refreshToken.user);
    if (refreshToken.parent == null) {
        await RefreshToken.findByIdAndUpdate(refreshToken._id, {
            status: false,
        });
    }
    await RefreshToken.deleteMany({ parent });

    const nextRefreshToken = await getNextRefreshToken(user._id, parent);

    return sendToken(user, nextRefreshToken, res);
};

exports.forgotPassword = async (req, res) => {
    const user = await User.findOne({
        phone_number: req.body.phone_number,
        gmail: req.body.gmail,
    });

    if (!user) {
        return res.status(404).json({
            success: false,
            code: 1009,
            message:
                "Không tìm thấy người dùng phù hợp với số điện thoại và địa chỉ gmail.",
        });
    }

    const otp = await user.generateForgotPasswordOtp();

    const message = `Mã OTP của bạn là: <span style='font-weight: bold; color: blue; font-size: large'>${otp}</span> có hiệu lực trong 90 giây<br /><strong>Nếu bạn không yêu cầu đặt lại mật khẩu thì hãy bỏ qua</strong>`;

    try {
        await sendVerificationEmail({
            gmail: user.gmail,
            subject: "Khôi phục mật khẩu Mạng Xã Hội",
            message,
        });
        res.json({
            success: true,
            message: `Đã gửi OTP đến: ${user.gmail}`,
        });
    } catch (error) {
        user.forgot_password = null;
        await user.save();
        return res.status(500).json({
            success: false,
            code: 1010,
            message: error.message,
        });
    }
};

exports.verifyOTP = async (req, res, next) => {
    const { phone_number, gmail, otp } = req.body;
    const user = await User.findOne({
        phone_number,
        gmail,
        "forgot_password.otp": otp,
        "forgot_password.otp_expires_at": { $gt: Date.now() },
    });
    if (!user) {
        return res.status(404).json({
            success: false,
            code: 1009,
            message:
                "Không tìm thấy người dùng phù hợp với số điện thoại và địa chỉ gmail.",
        });
    }

    if (user.forgot_password.otp != otp) {
        return res.status(400).json({
            success: false,
            code: 1011,
            message: "OTP không đúng.",
        });
    }

    if (user.forgot_password.otp_expires_at < Date.now()) {
        return res.status(400).json({
            success: false,
            code: 1012,
            message: "OTP hết hạn. Hãy yêu cầu gửi lại OTP",
        });
    }

    const resetPasswordToken = await user.generateResetPasswordToken();

    user.forgot_password = null;
    await user.save();

    res.json({
        success: true,
        resetPasswordToken,
    });
};

exports.resetPassword = async (req, res) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        "reset_password_token.token": resetPasswordToken,
        "reset_password_token.token_expires_at": { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).json({
            success: false,
            code: 1013,
            message: "Đặt lại mật khẩu không thành công. Vui lòng thử lại",
        });
    }

    if (req.body.new_password !== req.body.confirm) {
        return res.status(400).json({
            success: false,
            code: 1014,
            message: "Nhập lại mật khẩu không trùng khớp.",
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.new_password, 10);

    user.pass_word = hashedPassword;
    user.resetPassword = null;

    await user.save();

    res.json({
        success: true,
        message: "Đặt lại mật khẩu thành công",
    });
};

exports.sendRegisterOtp = async (req, res) => {
    const { gmail, phone_number } = req.body;
    const check_phone = await User.findOne({ phone_number: phone_number });
    if (check_phone) {
        return res.status(400).json({
            success: false,
            code: 1015,
            message: "Số điện thoại được đã đăng ký.",
        });
    }
    const check_gmail = await User.findOne({ gmail: gmail });
    if (check_gmail) {
        return res.status(400).json({
            success: false,
            code: 1016,
            message: "Gmail đã được đăng ký.",
        });
    }
    const otp = generateOTP(6);
    const registerOtp = await Register_otp.findOneAndUpdate(
        { gmail: gmail },
        {
            otp: otp,
            otp_expires_at:
                Date.now() +
                process.env.RESET_PASSWORD_TOKEN_EXPIRATION_TIME_IN_MINUTES *
                    60 *
                    1000,
        },
        {
            upsert: true,
            new: true,
        }
    );

    const message = `Mã OTP của bạn là: <span style='font-weight: bold; color: blue; font-size: large'>${otp}</span> có hiệu lực trong 90 giây<br />`;

    try {
        await sendVerificationEmail({
            gmail: gmail,
            subject: "Đăng ký tài khoản",
            message,
        });
        res.json({
            success: true,
            message: `Đã gửi OTP đến: ${gmail}`,
        });
    } catch (error) {
        await registerOtp.deleteOne();
        return res.status(500).json({
            success: false,
            code: 1017,
            message: error.message,
        });
    }
};
