const Addfriend = require('../models/Addfriend')
const Follow = require('../models/Follow');
const Friend = require('../models/Friend');
const User = require('../models/User');


//POST /interacts/follow/:id
exports.follow = (async (req, res) => {
    try {
        if(req.params.id==req.user._id){
            return res.status(400).json({
                success: false,
                message:'Phải dùng id của người khác, không được dùng id của bản thân.',
            });
        }
        const check_user = await User.findOne({ _id: req.params.id });
        if(!check_user){
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng.', 
            });
        }
        const user = await Follow.findOneAndUpdate(
            { user_id: req.user._id }, 
            {},
            { new: true, upsert: true }
        );
        const user_following = await Follow.findOneAndUpdate(
            { user_id: req.params.id },
            {},
            { new: true, upsert: true }
        );
        if (user.following_user_id.includes(req.params.id)){
            user.following_user_id.pull(req.params.id);
            await user.save();
            user_following.follower_user_id.pull(req.user._id);
            await user_following.save();
            return res.status(201).json({
                success: true,
                message: 'Unfollow thành công.',
            });
        } else{
            user.following_user_id.push(req.params.id);
            await user.save();
            user_following.follower_user_id.push(req.user._id);
            await user_following.save();
            return res.status(201).json({
                success: true,
                message: 'Follow thành công.',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message:'Thao tác thất bại :' + error.message, 
        });
    }
})

//POST /interacts/addfriend/:id
exports.addfriend = (async (req, res) => {
    try {
        if(req.params.id==req.user._id){
            return res.status(400).json({
                success: false,
                message:'Phải dùng id của người khác, không được dùng id của bản thân.',
            });
        }
        const check_user = await User.findOne({ _id: req.params.id });
        if(!check_user){
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng.', 
            });
        }
        const check_friend = await Friend.findOne({
            user_id: req.user._id,
            friend_id: req.params.id,
        })
        if(check_friend){
            return res.status(400).json({
                success: false,
                message: 'Không thể gửi lời mời. Các bạn đã là bạn bè.', 
            });
        }
        const user = await Addfriend.findOneAndUpdate(
            { user_id: req.user._id },
            {},
            { new: true, upsert: true }
        );
        if(user.add_user_id.includes(req.params.id)){
            user.add_user_id.pull(req.params.id);
            await user.save();
            return res.status(201).json({
                success: true,
                message: 'Hủy lời mời thành công.',
            });
        } else{
            user.add_user_id.push(req.params.id);
            await user.save();
            return res.status(201).json({
                success: true,
                message: 'Gửi lời mời thành công.',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message:'Thao tác thất bại :' + error.message,
        });
    }
})

//POST /interacts/accept/:id
exports.accept = (async (req, res) => {
    try {
        if(req.params.id==req.user._id){
            return res.status(400).json({
                success: false,
                message:'Phải dùng id của người khác, không được dùng id của bản thân.',
            });
        }
        const check_user = await User.findOne({ _id: req.params.id });
        if(!check_user){
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng.', 
            });
        }
        const request = await Addfriend.findOne({
            user_id: req.params.id,
            add_user_id: { $in: [req.user._id] }
        });
        if(!request){
            return res.status(404).json({
                success: false,
                message: 'Thao tác thất bại. Không có lời mời kết bạn từ người này.', 
            });
        }
        request.add_user_id.pull(req.user._id);
        await request.save();

        const user = await Friend.findOneAndUpdate(
            { user_id: req.user._id },
            {},
            { new: true, upsert: true }
        );
        user.friend_id.push(req.params.id);
        await user.save();

        const friend = await Friend.findOneAndUpdate(
            { user_id: req.params.id },
            {},
            { new: true, upsert: true }
        );
        friend.friend_id.push(req.user._id);
        await friend.save();

        res.status(201).json({
            success: true,
            message: 'Chấp nhận kết bạn.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:'Thao tác thất bại :' + error.message,
        });
    }
})

//POST /interacts/refuse/:id
exports.refuse = (async (req, res) => {
    try {
        if(req.params.id==req.user._id){
            return res.status(400).json({
                success: false,
                message:'Phải dùng id của người khác, không được dùng id của bản thân.',
            });
        }
        const check_user = await User.findOne({ _id: req.params.id });
        if(!check_user){
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng.', 
            });
        }
        const request = await Addfriend.findOne({
            user_id: req.params.id,
            add_user_id: { $in: [req.user._id] }
        });
        if(!request){
            return res.status(404).json({
                success: false,
                message: 'Thao tác thất bại. Không có lời mời kết bạn từ người này.', 
            });
        }
        request.add_user_id.pull(req.user._id);
        await request.save();
        res.status(201).json({
            success: true,
            message: 'Từ chối kết bạn.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:'Thao tác thất bại :' + error.message,
        });
    }
})

//POST /interacts/unfriend/:id
exports.unfriend = (async (req, res) => {
    try {
        await Friend.deleteOne({ 
            user_id: req.user._id,
            friend_id: req.params.id,
        })
        res.status(201).json({
            success: true,
            message: 'Hủy kết bạn.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message, 
        });
    }
})

//POST /interacts/block/:id
exports.block = (async (req, res) => {
    res.send('Hello World!')
})
