const Group = require("../models/Group");

const isSuperAdminGroup = async (req, res, next) => {
    const groupId = req.params.gr_id;
    const userId = req.user._id;
    const group = await Group.findById(groupId);
    if (!group) {
        return res.status(404).json({
            success: false,
            code: 10000,
            message: "Không tìm thấy nhóm.",
        });
    }
    const is_super_admin = group.super_admin.equals(userId);
    if (!is_super_admin) {
        return res.status(401).json({
            success: false,
            code: 10001,
            message: "Không đủ quyền truy cập. Bạn không phải là super admin.",
        });
    }
    next();
};

const isAdminGroup = async (req, res, next) => {
    const userId = req.user._id;
    const groupId = req.params.gr_id;
    const group = await Group.findById(groupId);
    if (!group) {
        return res.status(404).json({
            success: false,
            code: 10000,
            message: "Không tìm thấy nhóm.",
        });
    }
    const is_admin = group.admin.some((admin) =>
        admin.user_id.equals(userId)
    );

    const is_super_admin = group.super_admin.equals(userId);
    if (!(is_admin || is_super_admin)) {
        return res.status(401).json({
            success: false,
            code: 10002,
            message: "Không đủ quyền truy cập. Bạn không phải là admin.",
        });
    }
    next();
};

const isJoinGroup = async (req, res, next) => {
    const groupId = req.params.gr_id;
    const userId = req.user._id;
    const group = await Group.findById(groupId);
    if (!group) {
        return res.status(404).json({
            success: false,
            code: 10000,
            message: "Không tìm thấy nhóm.",
        });
    }
    const is_member = group.member.some((member) =>
        member.user_id.equals(userId)
    );

    const is_admin = group.admin.some((admin) =>
        admin.user_id.equals(userId)
    );

    const is_super_admin = group.super_admin.equals(userId);

    if (!(is_member || is_admin || is_super_admin)) {
        return res.status(400).json({
            success: false,
            code: 10050,
            message:
                "Không đủ quyền truy cập. Bạn chưa vào nhóm.",
        });
    }
    next();
};

const isMemberGroup = async (req, res, next) => {
    const groupId = req.params.gr_id;
    const userId = req.user._id;
    const group = await Group.findById(groupId);
    if (!group) {
        return res.status(404).json({
            success: false,
            code: 10000,
            message: "Không tìm thấy nhóm.",
        });
    }
    const is_member = group.member.some((member) =>
        member.user_id.equals(userId)
    );

    if (!is_member) {
        return res.status(400).json({
            success: false,
            code: 10051,
            message:
                "Không đủ quyền truy cập. Bạn không phải là thành viên nhóm.",
        });
    }
    next();
};

module.exports = {
    isAdminGroup,
    isSuperAdminGroup,
    isJoinGroup,
    isMemberGroup,
};
