const Addfriend = require('../models/Addfriend')
const Follow = require('../models/Follow')


//POST /interacts/follow/:id
exports.follow = (async (req, res) => {
    try {
        const user = await Follow.findOneAndUpdate(
            { user_id: req.user._id },
            //{ $setOnInsert: { user_id: req.user._id } },
            {},
            { new: true, upsert: true }
        );
        const user_following = await Follow.findOneAndUpdate(
            { user_id: req.params.id },
            //{ $setOnInsert: { user_id: req.params.id } },
            {},
            { new: true, upsert: true }
        );
        if (user.following_user_id.includes(req.params.id)){
            user.following_user_id.pull(req.params.id);
            await user.save();
            user_following.follower_user_id.pull(req.user._id);
            await user_following.save();
            res.status(201).json({
                success: true,
                message: 'Unfollow thành công.',
            });
        } else{
            user.following_user_id.push(req.params.id);
            await user.save();
            user_following.follower_user_id.push(req.user._id);
            await user_following.save();
            res.status(200).json({
                success: true,
                message: 'Follow thành công.',
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message, 
        });
    }
})

//POST /interacts/addfriend
exports.addfriend = (async (req, res) => {
    const user = await Addfriend.findOneAndUpdate(
        { user_id: req.user._id },
        //{ $setOnInsert: { user_id: req.user._id } },
        {},
        { new: true, upsert: true }
    );
})

//POST /interacts/accept
exports.accept = (async (req, res) => {
    res.send('Hello World!')
})

//POST /interacts/refuse
exports.refuse = (async (req, res) => {
    res.send('Hello World!')
})

//POST /interacts/unfriend
exports.unfriend = (async (req, res) => {
    res.send('Hello World!')
})

//POST /interacts/block
exports.block = (async (req, res) => {
    res.send('Hello World!')
})
