const Group = require("../models/Group");

const isSuperAdminGroup = async (req, res, next) => {
    const groupId = req.params.gr_id;
    const userId = req.user._id;
    const group = await Group.findById(groupId).select('super_admin admin member');
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
    req.group = group
    next();
};

const isAdminGroup = async (req, res, next) => {
    const userId = req.user._id;
    const groupId = req.params.gr_id;
    const group = await Group.findById(groupId).select('super_admin admin member request_join list_report regulation');
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
    req.group = group
    next();
};

const isJoinGroup = async (req, res, next) => {
    const groupId = req.params.gr_id;
    const userId = req.user._id;
    const group = await Group.findById(groupId).select('member admin super_admin').lean();
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
    const group = await Group.findById(groupId).select('member approve_post list_report');
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
    req.group = group
    next();
};

const isMemberAndAdminGroup = async (req, res, next) => {
    const groupId = req.params.gr_id;
    const userId = req.user._id;
    const group = await Group.findById(groupId).select('member admin').lean();
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
    if (!(is_member||is_admin)) {
        return res.status(400).json({
            success: false,
            code: 10052,
            message:
                "Không đủ quyền truy cập. Super admin và khách không thể truy cập",
        });
    }
    next();
};

module.exports = {
    isAdminGroup,
    isSuperAdminGroup,
    isJoinGroup,
    isMemberGroup,
    isMemberAndAdminGroup,
};
