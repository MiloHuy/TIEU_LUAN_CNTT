const User = require("../models/User");
const Group = require("../models/Group");

exports.search = (async (req, res) => {
    try {
        const { search, size } = req.query;

        let userQuery = {};
        if (search) {
            userQuery = {
                $or: [
                    { first_name: { $regex: search, $options: 'i' } },
                    { last_name: { $regex: search, $options: 'i' } }
                ]
            };
        }

        let groupQuery = {};
        if (search) {
            groupQuery = {
                name: { $regex: search, $options: 'i' }
            };
        }

        const users = await User.find(userQuery).select('avatar.url first_name last_name department').limit(Number(size));
        const groups = await Group.find(groupQuery).select('name avatar.url privacy').limit(Number(size));

        const total_user = users.length;
        const total_group = groups.length;

        return res.status(200).json({
            success: true,
            total_user,
            users,
            total_group,
            groups,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 4009,
            message: error.message, 
        });
    }
});