const Post = require('../models/Post')
const Story = require('../models/Story')
const User = require('../models/User')
const RefreshToken = require('../models/RefreshToken')
const Post_stored = require('../models/Post_stored')
const bcrypt = require('bcrypt');
const Addfriend = require('../models/Addfriend')

//GET /myposts
exports.getMyPosts = (async (req, res) => {
    try {
        const posts = await Post.find({ user_id : req.user._id })
        if(posts){
            return res.status(200).json({
                success: true,
                posts
            })
        } else{
            return res.status(200).json({
                success: true,
                message: 'Bạn chưa đăng bài!'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message, 
        });
    }
})

//GET /stored/posts
exports.getPosts = (async (req, res) => {
    try {
        const posts = await Post_stored.find({ user_id : req.user._id })
        if(posts){
            return res.status(200).json({
                success: true,
                posts
            })
        }else{
            return res.status(200).json({
                success: true,
                message: 'Bạn chưa lưu bài viết nào!'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message, 
        });
    }
})

//GET /stored/stories
exports.getStories = (async (req, res) => {
    try {
        const stories = await Story.find({ user_id : req.user._id })
        if(stories){
            return res.status(200).json({
                success: true,
                stories
            })
        }else{
            return res.status(200).json({
                success: true,
                message: 'Bạn chưa đăng story!'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message, 
        });
    }
})

//GET /account/info
exports.getInfo = (async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id }).select('-pass_word -role_id -is_active -__v -avatar -_id');
        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message, 
        });
    }
})

//GET /friendrequest
exports.getFriendRequest = (async (req, res) => {
    try {
        const request = await Addfriend.find({
            add_user_id: { $in: [req.user._id] }
        }).select('-_id user_id');
        if(request.length > 0){
            return res.status(200).json({
                success: true,
                request,
            });
        } else {
            return res.status(200).json({
                success: true,
                message: 'Không có lời mời kết bạn',
            });
        }
        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message, 
        });
    }
})

//PUT /account/info
exports.updateInfo = (async (req, res) => {
    try {
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                success: false,
                message:'Cập nhật thất bại. Chưa nhập dữ liệu.',
            })
        }
        const user = await User.findByIdAndUpdate(
            { _id : req.user._id },
            {$set: {...req.body}},
            { new: true },
        ).select('-pass_word -role_id -is_active -__v -avatar -_id');
        res.status(200).json({
            success: true,
            message:'Cập nhật thành công.',
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message:'Cập nhật thất bại.',
            message: error.message, 
        });
    }
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