const User = require('../models/User')
const bcrypt = require('bcrypt');

exports.loginUser = (async (req, res) => {
    res.send('Hello World!')
})

exports.registerUser = (async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.pass_word, 10);
        const newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            pass_word: hashedPassword,
            birth_day : req.body.birth_day,
            gender: req.body.gender,
            email: req.body.email,
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
            message: err.message 
        });
    }
})

exports.logout = (async (req, res) => {
    res.send('Hello World!')
})