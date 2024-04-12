const Group = require("../models/Group");

const isSuperAdminGroup = async (req, res, next) => {
    const groupId = req.params.gr_id;
    const group = await Group.findById(groupId);
    if (!group) {
        return res.status(404).json({
            success: false,
            code: 10000,
            message: "Không tìm thấy nhóm.",
        });
    }
    if (!group.super_admin.equals(req.user._id)) {
        return res.status(401).json({
            success: false,
            code: 10001,
            message: "Không đủ quyền truy cập. Bạn không phải là super admin.",
        });
    }
    next();
};

const isAdminGroup = async (req, res, next) => {
    const groupId = req.params.gr_id;
    const group = await Group.findById(groupId);
    if (!group) {
        return res.status(404).json({
            success: false,
            code: 10000,
            message: "Không tìm thấy nhóm.",
        });
    }
    if (!group.super_admin.equals(req.user._id) && !group.admin.some(admin => admin.user_id.equals(req.user._id))) {
        return res.status(401).json({
            success: false,
            code: 10002,
            message: "Không đủ quyền truy cập. Bạn không phải là admin.",
        });
    }
    next();
};

module.exports = {
    isAdminGroup,
    isSuperAdminGroup,
};
