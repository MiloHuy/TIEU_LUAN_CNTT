const Post = require('../models/Post')
const Story = require('../models/Story')
const User = require('../models/User')
const RefreshToken = require('../models/RefreshToken')
const Post_stored = require('../models/Post_stored')
const bcrypt = require('bcrypt');

//GET /myposts
exports.getMyPosts = (async (req, res) => {
    Post.find({ user_id : req.user._id })
    .then(posts => {
        res.status(200).json({
            success: true,
            posts
        })
    })
    .catch(err => {
        res.status(500).json({
            success: false, 
            message: err.message 
        });
    })
})

//GET /stored/posts
exports.getPosts = (async (req, res) => {
    Post_stored.find({ user_id : req.user._id })
    .then(posts => {
        res.status(200).json({
            success: true,
            posts
        })
    })
    .catch(err => {
        res.status(500).json({
            success: false, 
            message: err.message 
        });
    })
    
})

//GET /stored/stories
exports.getStories = (async (req, res) => {
    Story.find({ user_id : req.user._id })
    .then(posts => {
        res.status(200).json({
            success: true,
            posts
        })
    })
    .catch(err => {
        res.status(500).json({
            success: false, 
            message: err.message 
        });
    })
})

//PUT /account/info
exports.updateInfo = (async (req, res) => {
    await User.findByIdAndUpdate(
        { _id : req.user._id },
        {$set: {...req.body}},
        { new: true },
        )
    .then(user => {
        res.status(200).json({
            success: true,
            user
        })
    })
    .catch(err => {
        res.status(500).json({
            success: false, 
            message: err.message 
        });
    })
})

//PUT /account/password
exports.updatePassword = (async (req, res) => {
    const user = req.user;
    const { password, new_password, confirm } = req.body;
    const updateUser = await User.findById(user._id);
    const isMatch = await bcrypt.compare(password, updateUser.pass_word);
    if (!isMatch) {
        return res.status(400).json({ 
            success: false, 
            message: 'Mật khẩu không chính xác.' 
        });
    }

    if (new_password !== confirm) {
        return res.status(400).json({ 
            success: false, 
            message: 'Nhập lại mật khẩu không chính xác.' });
    }
    const hashedPassword = await bcrypt.hash(new_password, 10);
    await User.findByIdAndUpdate(updateUser._id, { pass_word: hashedPassword });
    await RefreshToken.deleteMany({ user: user._id });

    res.clearCookie('refreshToken', { path: 'auth' });
    res.status(200).json({ 
        success: true, 
        message: 'Đổi mât khẩu thành công.' 
    });
})