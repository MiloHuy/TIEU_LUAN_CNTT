const Post = require('../models/Post')
const Story = require('../models/Story')
const User = require('../models/User')
const RefreshToken = require('../models/RefreshToken')
const Post_stored = require('../models/Post_stored')
const bcrypt = require('bcrypt');
const Addfriend = require('../models/Addfriend')
const Post_liked = require('../models/Post_liked')
const Friend = require('../models/Friend')

//GET /posts
exports.getMyPosts = (async (req, res) => {
    try {
        const posts = await Post.find({ user_id : req.user._id })
            .select('_id post_img.url')
            .lean()
        if(!posts){
            return res.status(200).json({
                success: true,
                posts: []
            })
        }
        const postsAfferCountLike = await Promise.all(posts.map(async (post) => {
            const post_like = await Post_liked.findOne({ post_id: post._id });
            const likes = post_like ? post_like.user_id.length : 0;

            //Làm thêm phần count_cmt
        
            return {
                ...post,
                likes,
            };
        }));

        return res.status(200).json({
            success: true,
            posts: postsAfferCountLike
        })
            
        
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
        const store = await Post_stored.findOne({ user_id : req.user._id })
        .select('post_id -_id')
        .populate('post_id', 'post_img.url')
        .lean()
        if(!store){
            return res.status(200).json({
                success: true,
                posts: []
            })
        }
        const posts = store.post_id
        const postsAfferCountLike = await Promise.all(posts.map(async (post) => {
            const post_like = await Post_liked.findOne({ post_id: post._id });
            const likes = post_like ? post_like.user_id.length : 0;

            //Làm thêm phần count_cmt
        
            return {
                ...post,
                likes,
            };
        }));
        return res.status(200).json({
            success: true,
            posts: postsAfferCountLike
        })
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
        const stories = await Story.find({ user_id : req.user._id }).select('-story_content.publicId')
        return res.status(200).json({
            success: true,
            stories
        })
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

//GET /friend-request
exports.getFriendRequest = (async (req, res) => {
    try {
        const request = await Addfriend.find({
            add_user_id: req.user._id
        })
            .populate('user_id', 'first_name last_name avatar.url')
            .select('-_id user_id');
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

//GET /friends
exports.getFriends = (async (req, res) => {
    try {
        const friends = await Friend.find({
            user_id: req.user._id
        })
            .populate('friend_id', 'first_name last_name avatar.url')
            .select('-_id friend_id');
        if(friends.length > 0){
            return res.status(200).json({
                success: true,
                friends,
            });
        } else {
            return res.status(200).json({
                success: true,
                message: 'Chưa có bạn',
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
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ 
            success: false, 
            message: 'Không tìm thấy người dùng.' 
        });;
    }
    const isPasswordMatched = await user.comparePassword(req.body.pass_word);
    if (!isPasswordMatched) {
        return res.status(400).json({ 
            success: false, 
            message: 'Mật khẩu không chính xác.' 
        });
    }
    if (req.body.new_password !== req.body.confirm) {
        return res.status(400).json({ 
            success: false, 
            message: 'Nhập lại mật khẩu không trùng khớp.' });
    }

    const hashedPassword = await bcrypt.hash(req.body.new_password, 10);

    await User.findByIdAndUpdate(req.user._id, { pass_word: hashedPassword });

    res.status(201).json({ 
        success: true, 
        message: 'Đổi mật khẩu thành công.' 
    });
})