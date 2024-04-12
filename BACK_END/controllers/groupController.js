const Group = require("../models/Group");
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
const path = require("path");
const SuperAdminGroup = require("../models/SuperAdminGroup");
const GuestGroup = require("../models/GuestGroup");
const AdminGroup = require("../models/AdminGroup");
const MemberGroup = require("../models/MemberGroup");

const validImageFormats = ["jpg", "jpeg", "png", "mp4"];
const maxFileSize = 10 * 1024 * 1024;
exports.create = async (req, res) => {
    try {
        if (!req.files || !req.files.group_avatar) {
            console.log(req.body);
            const Avatar = null;
            const group = Group.create({
                avatar: Avatar,
                super_admin: req.user._id,
                ...req.body,
            });
            return res.status(200).json({
                success: true,
                message: "Tạo nhóm thành công.",
            });
        }
        let Avatar;
        const fileExtension = path
            .extname(req.files.group_avatar.name)
            .toLowerCase();
        const allowedExtensions = validImageFormats.map(
            (format) => `.${format}`
        );

        if (!allowedExtensions.includes(fileExtension)) {
            return res.status(400).json({
                success: false,
                code: 10003,
                message:
                    "Đăng bài thất bại. Định dạng file không hợp lệ. Chỉ chấp nhận .jpg, .jpeg, .png, .mp4.",
            });
        }

        const fileSize = req.files.group_avatar.data.length;
        if (fileSize > maxFileSize) {
            return res.status(400).json({
                success: false,
                code: 10004,
                message:
                    "Đăng bài thất bại. Kích thước file vượt quá giới hạn cho phép (10MB).",
            });
        }

        const result = await new Promise((resolve) => {
            cloudinary.uploader
                .upload_stream(
                    { resource_type: "auto", folder: "group_avatar" },
                    (error, uploadResult) => {
                        if (error) {
                            console.log(error);
                            return res.status(400).json({
                                success: false,
                                code: 10005,
                                message: "Lỗi lưu ảnh lên cloundinary.",
                            });
                        }
                        return resolve(uploadResult);
                    }
                )
                .end(req.files.group_avatar.data);
        });

        Avatar = {
            publicId: result.public_id,
            url: result.secure_url,
        };

        const group = Group.create({
            avatar: Avatar,
            super_admin: req.user._id,
            ...req.body,
        });
        return res.status(200).json({
            success: true,
            message: "Tạo nhóm thành công.",
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10006,
            message: "Tạo nhóm thất bại :" + error.message,
        });
    }
};

exports.getRolePermission = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        return res.status(200).json({
            success: true,
            group,
        });

        console.log(group.privacy);
        let role_permisson = null;
        let is_active = null;
        switch (true) {
            case group.super_admin.equals(req.user._id):
                role_permisson = await SuperAdminGroup.findOne({
                    role: "super-admin",
                })
                    .select("-_id -__v")
                    .lean();
                return res.status(200).json({
                    success: true,
                    role_permisson,
                });
            case group.admin.some((admin) =>
                admin.user_id.equals(req.user._id)
            ):
                const admin = group.admin.find((admin) =>
                    admin.user_id.equals(req.user._id)
                );

                // if(admin.is_active==false){
                //     return res.status(401).json({
                //         success: false,
                //         code: 10005,
                //         message: "Bạn bị cấm hoạt động trong nhóm.",
                //     });
                // }

                is_active = admin.is_active;

                role_permisson = admin.role_permisson;
                return res.status(200).json({
                    success: true,
                    role_permisson,
                    is_active,
                });
            case group.member.some((member) =>
                member.user_id.equals(req.user._id)
            ):
                const member = group.member.find((member) =>
                    member.user_id.equals(req.user._id)
                );

                is_active = member.is_active;

                role_permisson = await MemberGroup.findOne({
                    role: "member",
                })
                    .select("-_id -__v")
                    .lean();
                return res.status(200).json({
                    success: true,
                    role_permisson,
                    is_active,
                });
            case group.privacy == 1:
                role_permisson = await GuestGroup.findOne({
                    role: "guest",
                })
                    .select("-_id -__v")
                    .lean();
                role_permisson.permission.See.GET.posts = undefined;
                role_permisson.permission.See.GET.post = undefined;
                return res.status(200).json({
                    success: true,
                    role_permisson,
                });
            default:
                role_permisson = await GuestGroup.findOne({
                    role: "guest",
                })
                    .select("-_id -__v")
                    .lean();
                return res.status(200).json({
                    success: true,
                    role_permisson,
                });
        }
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10007,
            message: "Lấy quyền thất bại :" + error.message,
        });
    }
};

exports.addAdmin = async (req, res) => {
    try {
        const admin_id = req.params.user_id;
        const groupId = req.params.gr_id;
        const group = await Group.findById(groupId);
        const check_admin = group.admin.find(
            (admin) => admin.user_id.toString() === admin_id
        );

        if (check_admin) {
            return res.status(401).json({
                success: false,
                code: 10008,
                message: "Bạn đã thêm người này làm admin.",
            });
        }

        const admin = await AdminGroup.findOne({ role: "admin" });

        const new_admin = {
            user_id: admin_id,
            role_permisson: admin.role_permisson,
        };
        group.admin.push(new_admin);

        await group.save();

        // const groupId = "6616a444d100cbd360747a45";
        // const userIdToUpdate = "65571ebee20722647b9fc8cf";

        // const group = await Group.findById(groupId);

        // if (!group) {
        //     return res
        //         .status(404)
        //         .json({ success: false, message: "Group not found" });
        // }

        // const adminToUpdate = group.admin.find(
        //     (admin) => admin.user_id.toString() === userIdToUpdate
        // );

        // if (!adminToUpdate) {
        //     return res
        //         .status(404)
        //         .json({ success: false, message: "Admin not found" });
        // }

        // // adminToUpdate.role_permisson.permission.Manage_member = undefined;
        // adminToUpdate.role_permisson.permission.Manage_member = {
        //     GET: {
        //         members: "group/:gr_id/admin/members",
        //         request_join: "group/:gr_id/admin/request-join",
        //     },
        //     POST: {
        //         accept_request: "group/:gr_id/admin/accept-request/:user_id",
        //     },
        //     PUT: {
        //         edit_active: "group/:gr_id/admin/edit-active/:user_id",
        //     },
        //     DELETE: {
        //         delete_member: "group/:gr_id/admin/delete_member/:user_id",
        //     },
        // };

        // await group.save();

        return res.status(200).json({
            success: true,
            message: "Thêm admin thành công.",
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10009,
            message: "Thêm admin thất bại :" + error.message,
        });
    }
};

exports.inviteUser = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const groupId = req.params.gr_id;
        const group = await Group.findById(groupId);

        const is_member = group.member.find(
            (member) => member.user_id.toString() === user_id
        );

        const is_admin = group.admin.find(
            (admin) => admin.user_id.toString() === user_id
        );

        if (is_member || is_admin || group.super_admin.equals(user_id)) {
            return res.status(401).json({
                success: false,
                code: 10010,
                message: "Người này đã vào nhóm.",
            });
        }

        const member = await MemberGroup.findOne({ role: "member" });

        const new_member = {
            user_id: user_id,
            role_permisson: member.role_permisson,
        };
        group.member.push(new_member);

        await group.save();

        return res.status(200).json({
            success: true,
            message: "Mời vào nhóm thành công.",
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10011,
            message: "Thêm admin thất bại :" + error.message,
        });
    }
};

exports.getInfo = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const group = await Group.findById(groupId)
            .select("avatar.url name privacy member admin")
            .lean();
        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        let number_of_members = 1; // Tính cả admin hiện tại
        if (group.member && group.member.length) {
            number_of_members += group.member.length;
            console.log(group.member.length);
        }
        if (group.admin && group.admin.length) {
            number_of_members += group.admin.length;
            console.log(group.admin.length);
        }

        group.number_of_members = number_of_members;

        delete group.member;
        delete group.admin;

        return res.status(200).json({
            success: true,
            group: group,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10011,
            message: "Xem thông tin thất bại :" + error.message,
        });
    }
};

exports.getMembers = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const group = await Group.findById(groupId)
            .select("super_admin member.user_id admin.user_id")
            .populate(
                "member.user_id super_admin admin.user_id",
                "first_name last_name avatar.url"
            )
            .lean();

        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        const members = group.member
            .map((member) => member.user_id)
            .concat(group.admin.map((admin) => admin.user_id))
            .concat(group.super_admin);

        return res.status(200).json({
            success: true,
            members,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10012,
            message: "Thêm admin thất bại :" + error.message,
        });
    }
};

exports.requestJoin = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        const is_member = group.member.find(
            (member) => member.user_id.toString() === req.user._id
        );

        const is_admin = group.admin.find(
            (admin) => admin.user_id.toString() === req.user._id
        );

        if (is_member || is_admin || group.super_admin.equals(req.user._id)) {
            return res.status(401).json({
                success: false,
                code: 10014,
                message: "Bạn đã là thành viên của nhóm.",
            });
        }

        const is_request = group.request_join.some((request) =>
            request.user_id.equals(req.user._id)
        );
        if (is_request) {
            const request = {
                user_id: req.user._id,
            };
            group.request_join.pull(request);
            await group.save();
            return res.status(200).json({
                success: true,
                message: "Hủy yêu cầu vào nhóm thành công.",
            });
        }

        const new_request = {
            user_id: req.user._id,
        };

        group.request_join.push(new_request)
        await group.save()

        return res.status(200).json({
            success: true,
            message: "Yêu cầu vào nhóm thành công.",
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10013,
            message: "Yêu cầu vào nhóm thất bại :" + error.message,
        });
    }
};


exports.getRegulation = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const group = await Group.findById(groupId)
            // .select("regulation")
            .lean();
        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        const regulation = group.regulation

        return res.status(200).json({
            success: true,
            regulation,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10015,
            message: "Xem thông tin thất bại :" + error.message,
        });
    }
};
