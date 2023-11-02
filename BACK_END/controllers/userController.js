const User = require('../models/User')

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