const User = require('../models/User')
const Friend = require('../models/Friend')

//GET /info/:id
exports.getInfo = (async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).select('first_name last_name avatar');
        const check_friend = await Friend.findOne({
            user_id: req.params.id,
            friend_id: req.user._id
        })
        const relationship = check_friend ? "Bạn" : "Người lạ";
        res.status(200).json({
            success: true,
            user,
            relationship,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message, 
        });
    }
})

//GET /users/admin
exports.getAll = (async (req, res, next) => {
    User.find({})
        .then(posts => {
            res.json(posts)
            res.status(200).json({
                success: true,
                posts
            })
        })
        .catch(next)
})

//DELETE /users/admin/:id
exports.disabled = (async (req, res, next) => {
    User.delete({ _id: req.params.id})
      .then(() => res.redirect('back'))
      .catch(next)

})