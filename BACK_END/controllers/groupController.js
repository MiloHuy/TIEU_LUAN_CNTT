const Group = require("../models/Group");
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
const path = require("path");
const SuperAdminGroup = require("../models/SuperAdminGroup");
const GuestGroup = require("../models/GuestGroup");
const AdminGroup = require("../models/AdminGroup");
const MemberGroup = require("../models/MemberGroup");
const { group, log } = require("console");
const User = require("../models/User");
const Post = require("../models/Post");
const { PostAPIFeatures } = require("../utils/APIFeatures");
const Post_liked = require("../models/Post_liked");
const Post_stored = require("../models/Post_stored");

const validImageFormats = ["jpg", "jpeg", "png", "mp4"];
const maxFileSize = 10 * 1024 * 1024;
exports.create = async (req, res) => {
    try {
        if (!req.body.name || req.body.name == null) {
            return res.status(400).json({
                success: false,
                code: 10026,
                message: "Tạo nhóm thất bại. Phải có tên nhóm.",
            });
        }
        // console.log(req.body);
        // if (req.privacy != '1' && req.privacy != '2') {
        //     return res.status(400).json({
        //         success: false,
        //         code: 10025,
        //         message: "Tạo nhóm thất bại. Phạm vi nhóm không hợp lệ.",
        //     });
        // }
        // const privacy=req.body
        // return res.status(400).json({
        //     success: false,
        //     code: 10025,
        //     message: privacy,
        // });
        // switch (true) {
        //     case req.privacy == 0:
        //         break;
        //     case req.privacy == 1:
        //         break;
        //     case req.privacy == 2:
        //         break;
        //     default:
        //         return res.status(400).json({
        //             success: false,
        //             code: 10025,
        //             message: "Tạo nhóm thất bại. Phạm vi nhóm không hợp lệ.",
        //         });
        // }
        if (!req.files || !req.files.group_avatar) {
            console.log(req.body);
            const Avatar = null;
            const group = await Group.create({
                avatar: Avatar,
                super_admin: req.user._id,
                ...req.body,
            });
            const gr_id = group._id;
            return res.status(200).json({
                success: true,
                message: "Tạo nhóm thành công.",
                group_id: gr_id,
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
                    "Tạo nhóm thất bại. Định dạng file không hợp lệ. Chỉ chấp nhận .jpg, .jpeg, .png, .mp4.",
            });
        }

        const fileSize = req.files.group_avatar.data.length;
        if (fileSize > maxFileSize) {
            return res.status(400).json({
                success: false,
                code: 10004,
                message:
                    "Tạo nhóm thất bại. Kích thước file vượt quá giới hạn cho phép (10MB).",
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
        // console.log(req.body);
        const group = await Group.create({
            avatar: Avatar,
            super_admin: req.user._id,
            ...req.body,
        });
        const gr_id = group._id;
        return res.status(200).json({
            success: true,
            message: "Tạo nhóm thành công.",
            group_id: gr_id,
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

        // const member = {
        //     role: "member",
        // };
        // const admin = {
        //     role: "member",
        // };

        // await MemberGroup.create(member);
        // await AdminGroup.create(admin);

        return res.status(200).json({
            success: true,
            group,
        });

        console.log(group.privacy);
        let role_permisson = null;
        let is_active = null;
        let check_request = null;
        let is_request = false;
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
                check_request = group.request_join.some((request) =>
                    request.user_id.equals(req.user._id)
                );
                if (check_request) {
                    is_request = true;
                }
                return res.status(200).json({
                    success: true,
                    role_permisson,
                    is_request,
                });
            default:
                role_permisson = await GuestGroup.findOne({
                    role: "guest",
                })
                    .select("-_id -__v")
                    .lean();
                check_request = group.request_join.some((request) =>
                    request.user_id.equals(req.user._id)
                );
                if (check_request) {
                    is_request = true;
                }
                return res.status(200).json({
                    success: true,
                    role_permisson,
                    is_request,
                });
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
            message: "Lấy danh sách thành viên thất bại :" + error.message,
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

        group.request_join.push(new_request);
        await group.save();

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

        const regulation = group.regulation;

        return res.status(200).json({
            success: true,
            regulation,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10015,
            message: "Xem nội quy thất bại :" + error.message,
        });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const { size } = req.query;
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

        const posts = Post.find({
            group_id: groupId,
            is_approved: true,
        })
            .sort({ create_post_time: -1 })
            .select("-post_img.publicId -post_img._id")
            .populate("user_id", "first_name last_name avatar.url");

        const apiFeatures = new PostAPIFeatures(posts, req.query);

        let allPosts = await apiFeatures.query;
        const totals = allPosts.length;

        const apiFeaturesPagination = new PostAPIFeatures(
            Post.find(posts),
            req.query
        ).pagination(size);

        allPosts = await apiFeaturesPagination.query;

        const check_liked = await Post_liked.find({
            user_id: req.user._id,
        }).select("post_id");
        const check_stored = await Post_stored.find({
            user_id: req.user._id,
        }).select("post_id");

        const postsAfferCheck = allPosts.map((post) => {
            const isLiked = check_liked.some((like) =>
                like.post_id.equals(post._id)
            );
            const isStored = check_stored.some((store) => {
                return store.post_id.some((storeId) =>
                    storeId.equals(post._id)
                );
            });
            return {
                ...post.toObject(),
                liked: isLiked,
                stored: isStored,
            };
        });

        const postsAfferCountLike = await Promise.all(
            postsAfferCheck.map(async (post) => {
                const post_like = await Post_liked.findOne({
                    post_id: post._id,
                });
                const likes = post_like ? post_like.user_id.length : 0;

                return {
                    ...post,
                    likes,
                };
            })
        );

        return res.status(200).json({
            success: true,
            totals,
            posts: postsAfferCountLike,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10034,
            message: "Xem bài viết thất bại " + error.message,
        });
    }
};

exports.getPost = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const postId = req.params.post_id;
        const { size } = req.query;
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

        const post = Post.findById(postId)
            .sort({ create_post_time: -1 })
            .select("-post_img.publicId -post_img._id")
            .populate("user_id", "first_name last_name avatar.url");

        if (!post) {
            return res.status(404).json({
                success: false,
                code: 2001,
                message: "Không tìm thấy bài viết.",
            });
        }

        if(post.is_approved == false && post.user_id != req.user._id){
            return res.status(500).json({
                success: false,
                code: 10037,
                message: "Không thể xem bài viết chưa được duyệt",
            });
        }

        const check_liked = await Post_liked.findOne({
            post_id: postId,
            user_id: req.user._id,
        });
        const check_stored = await Post_stored.findOne({
            user_id: req.user._id,
            post_id: postId,
        });

        post.liked = !!check_liked;
        post.stored = !!check_stored;

        const post_like = await Post_liked.findOne({ post_id: post._id });
        post.likes = post_like ? post_like.user_id.length : 0;

        return res.status(200).json({
            success: true,
            post,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        return res.status(500).json({
            success: false,
            code: 10036,
            message: "Xem bài viết thất bại " + error.message,
        });
    }
};

exports.getMyPosts = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const userId = req.user._id;
        const { size } = req.query;
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

        const posts = Post.find({
            group_id: groupId,
            user_id: userId,
            is_approved: true,
        })
            .sort({ create_post_time: -1 })
            .select("-post_img.publicId -post_img._id")
            .populate("user_id", "first_name last_name avatar.url");

        const apiFeatures = new PostAPIFeatures(posts, req.query);

        let allPosts = await apiFeatures.query;
        const totals = allPosts.length;

        const apiFeaturesPagination = new PostAPIFeatures(
            Post.find(posts),
            req.query
        ).pagination(size);

        allPosts = await apiFeaturesPagination.query;

        const check_liked = await Post_liked.find({
            user_id: req.user._id,
        }).select("post_id");
        const check_stored = await Post_stored.find({
            user_id: req.user._id,
        }).select("post_id");

        const postsAfferCheck = allPosts.map((post) => {
            const isLiked = check_liked.some((like) =>
                like.post_id.equals(post._id)
            );
            const isStored = check_stored.some((store) => {
                return store.post_id.some((storeId) =>
                    storeId.equals(post._id)
                );
            });
            return {
                ...post.toObject(),
                liked: isLiked,
                stored: isStored,
            };
        });

        const postsAfferCountLike = await Promise.all(
            postsAfferCheck.map(async (post) => {
                const post_like = await Post_liked.findOne({
                    post_id: post._id,
                });
                const likes = post_like ? post_like.user_id.length : 0;

                return {
                    ...post,
                    likes,
                };
            })
        );

        return res.status(200).json({
            success: true,
            totals,
            posts: postsAfferCountLike,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 1035,
            message: "Xem bài viết của tôi thất bại " + error.message,
        });
    }
};

exports.leaveGroup = async (req, res) => {
    try {
        const userId = req.user._id;
        const groupId = req.params.gr_id;
        const group = await Group.findById(groupId).lean();
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
            res.status(401).json({
                success: false,
                code: 10021,
                message: "Bạn không thể thực hiện thao tác này.",
            });
        }

        await Group.findOneAndUpdate(
            { _id: groupId, "member.user_id": userId },
            { $pull: { member: { user_id: userId } } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Rời nhóm thành công",
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10020,
            message: "Rời nhóm thất bại" + error.message,
        });
    }
};

exports.inviteUser = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const groupId = req.params.gr_id;
        const group = await Group.findById(groupId);

        const check_user = await User.findById(userId);

        if (!check_user) {
            return res.status(401).json({
                success: false,
                code: 10024,
                message: "Không tìm thấy người dùng",
            });
        }

        const is_member = group.member.find(
            (member) => member.user_id.toString() === userId
        );

        const is_admin = group.admin.find(
            (admin) => admin.user_id.toString() === userId
        );

        if (is_member || is_admin || group.super_admin.equals(userId)) {
            return res.status(401).json({
                success: false,
                code: 10010,
                message: "Người này đã vào nhóm.",
            });
        }

        // const member = await MemberGroup.findOne({ role: "member" });

        const new_member = {
            user_id: userId,
        };

        const is_request = group.request_join.some((request) =>
            request.user_id.equals(userId)
        );
        if (is_request) {
            group.request_join.pull(new_member);
        }
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
            message: "Thêm thành viên thất bại :" + error.message,
        });
    }
};

exports.adminGetRequestJoin = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const group = await Group.findById(groupId)
            .select("request_join.user_id ")
            .populate("request_join.user_id", "first_name last_name avatar.url")
            .lean();

        const request_join = group.request_join.map(
            (request_join) => request_join.user_id
        );

        return res.status(200).json({
            success: true,
            request_join,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10016,
            message: "Lấy yêu cầu vào nhóm thất bại :" + error.message,
        });
    }
};

exports.adminAcceptRequest = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const groupId = req.params.gr_id;
        const group = await Group.findById(groupId);

        const check_user = await User.findById(userId);

        if (!check_user) {
            return res.status(401).json({
                success: false,
                code: 10024,
                message: "Không tìm thấy người dùng",
            });
        }

        const is_member = group.member.find(
            (member) => member.user_id.toString() === userId
        );

        const is_admin = group.admin.find(
            (admin) => admin.user_id.toString() === userId
        );

        if (is_member || is_admin || group.super_admin.equals(userId)) {
            return res.status(401).json({
                success: false,
                code: 10018,
                message: "Người này đã là thành viên của nhóm.",
            });
        }

        const is_request = group.request_join.some((request) =>
            request.user_id.equals(userId)
        );
        if (!is_request) {
            return res.status(404).json({
                success: false,
                code: 10017,
                message: "Người này không yêu cầu vào nhóm.",
            });
        }
        const new_member = {
            user_id: userId,
        };
        group.member.push(new_member);
        group.request_join.pull(new_member);

        await group.save();

        return res.status(200).json({
            success: true,
            message: "Duyệt thành viên vào nhóm thành công.",
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10016,
            message: "Duyệt thành viên vào nhóm thất bại :" + error.message,
        });
    }
};

exports.adminRefuseRequest = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const groupId = req.params.gr_id;
        const group = await Group.findById(groupId);

        const check_user = await User.findById(userId);

        if (!check_user) {
            return res.status(401).json({
                success: false,
                code: 10024,
                message: "Không tìm thấy người dùng",
            });
        }

        const is_member = group.member.find(
            (member) => member.user_id.toString() === userId
        );

        const is_admin = group.admin.find(
            (admin) => admin.user_id.toString() === userId
        );

        if (is_member || is_admin || group.super_admin.equals(userId)) {
            return res.status(401).json({
                success: false,
                code: 10018,
                message: "Người này đã là thành viên của nhóm.",
            });
        }

        const is_request = group.request_join.some((request) =>
            request.user_id.equals(userId)
        );
        if (!is_request) {
            return res.status(404).json({
                success: false,
                code: 10017,
                message: "Người này không yêu cầu vào nhóm.",
            });
        }
        const new_member = {
            user_id: userId,
        };
        group.request_join.pull(new_member);

        await group.save();

        return res.status(200).json({
            success: true,
            message: "Từ chối thành viên vào nhóm thành công.",
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10019,
            message: "Từ chối viên vào nhóm thất bại :" + error.message,
        });
    }
};

exports.addAdmin = async (req, res) => {
    try {
        const adminId = req.params.user_id;
        const groupId = req.params.gr_id;
        const group = await Group.findById(groupId);
        const check_admin = group.admin.find(
            (admin) => admin.user_id.toString() === adminId
        );

        const check_user = await User.findById(userId);

        if (!check_user) {
            return res.status(401).json({
                success: false,
                code: 10024,
                message: "Không tìm thấy người dùng",
            });
        }

        if (check_admin) {
            return res.status(401).json({
                success: false,
                code: 10008,
                message: "Bạn đã thêm người này làm admin.",
            });
        }

        const admin = await AdminGroup.findOne({ role: "admin" });

        const new_admin = {
            user_id: adminId,
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

exports.getGroup = async (req, res) => {
    try {
        const groups = await Group.find({
            $or: [
                { super_admin: req.user._id },
                { "admin.user_id": req.user._id },
                { "member.user_id": req.user._id },
            ],
        })
            .select("_id name avatar member")
            .lean();

        groups.forEach((group) => {
            let is_admin = true;

            if (group.member && group.member.length > 0) {
                const is_member = group.member.find(
                    (member) =>
                        member.user_id.toString() === req.user._id.toString()
                );

                if (is_member) {
                    is_admin = false;
                }
            }

            delete group.member;

            group.is_admin = is_admin;
        });

        return res.status(200).json({
            success: true,
            groups,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10022,
            message: "Lấy danh sách nhóm thất bại :" + error.message,
        });
    }
};

exports.getGroupAdmin = async (req, res) => {
    try {
        const groups = await Group.find({ "admin.user_id": req.user._id })
            .select("_id name avatar")
            .lean();

        return res.status(200).json({
            success: true,
            groups,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10023,
            message:
                "Lấy danh sách nhóm vai trò quản trị viên thất bại :" +
                error.message,
        });
    }
};

exports.getGroupSuperAdmin = async (req, res) => {
    try {
        const groups = await Group.find({ super_admin: req.user._id })
            .select("_id name avatar")
            .lean();

        return res.status(200).json({
            success: true,
            groups,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10024,
            message:
                "Lấy danh sách nhóm vai trò super admin thất bại :" +
                error.message,
        });
    }
};

exports.adminGetMembers = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const group = await Group.findById(groupId)
            .select("member.user_id")
            .populate("member.user_id", "first_name last_name avatar.url")
            .lean();

        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        const members = group.member.map((member) => member.user_id);

        return res.status(200).json({
            success: true,
            members: members,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10025,
            message:
                "Admin lấy danh sách thành viên thất bại :" + error.message,
        });
    }
};

exports.adminEditActive = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const userId = req.params.user_id;
        const group = await Group.findById(groupId)
            // .select("member.user_id")
            // .populate(
            //     "member.user_id",
            //     "first_name last_name avatar.url"
            // )
            .lean();

        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        const is_member = group.member.find(
            (member) => member.user_id.toString() === userId
        );

        if (!is_member) {
            return res.status(404).json({
                success: false,
                code: 10027,
                message: "Người này không phải thành viên của nhóm",
            });
        }

        new_status = is_member.is_active;

        const updatedGroup = await Group.findOneAndUpdate(
            { _id: groupId, "member.user_id": userId },
            { $set: { "member.$.is_active": !new_status } },
            { new: true }
        );

        const new_list = updatedGroup.member;

        return res.status(200).json({
            success: true,
            members: new_list,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10026,
            message: "Admin edit active thất bại :" + error.message,
        });
    }
};

exports.adminDeleteUser = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const userId = req.params.user_id;
        const group = await Group.findById(groupId)
            // .select("member.user_id")
            // .populate(
            //     "member.user_id",
            //     "first_name last_name avatar.url"
            // )
            .lean();

        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        const is_member = group.member.find(
            (member) => member.user_id.toString() === userId
        );

        if (!is_member) {
            return res.status(404).json({
                success: false,
                code: 10027,
                message: "Người này không phải thành viên của nhóm",
            });
        }

        const updatedGroup = await Group.findOneAndUpdate(
            { _id: groupId },
            { $pull: { member: { user_id: userId } } },
            { new: true }
        );

        // const new_list = updatedGroup.member

        return res.status(200).json({
            success: true,
            message: "Admin delete thành công.",
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10028,
            message: "Admin delete thất bại :" + error.message,
        });
    }
};

exports.adminGetAllPosts = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const { size } = req.query;
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

        const posts = Post.find({
            group_id: groupId,
        })
            .sort({ create_post_time: -1 })
            .select("-post_img.publicId -post_img._id")
            .populate("user_id", "first_name last_name avatar.url");

        const apiFeatures = new PostAPIFeatures(posts, req.query);

        let allPosts = await apiFeatures.query;
        const totals = allPosts.length;

        const apiFeaturesPagination = new PostAPIFeatures(
            Post.find(posts),
            req.query
        ).pagination(size);

        allPosts = await apiFeaturesPagination.query;

        res.status(200).json({
            success: true,
            totals,
            posts: allPosts,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10035,
            message: "Admin lấy danh sách bài viết thất bại " + error.message,
        });
    }
};

exports.createPost = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const group = await Group.findById(groupId).lean();
        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        if (!Array.isArray(req.files.post_img)) {
            req.files.post_img = [req.files.post_img];
        }

        if (!req.files.post_img || req.files.post_img.length === 0) {
            return res.status(400).json({
                success: false,
                code: 2003,
                message:
                    "Đăng bài thất bại. Bài đăng phải có ít nhất một ảnh hoặc video.",
            });
        }

        const postImages = [];

        for (const file of req.files.post_img) {
            const fileExtension = path.extname(file.name).toLowerCase();
            const allowedExtensions = validImageFormats.map(
                (format) => `.${format}`
            );

            if (!allowedExtensions.includes(fileExtension)) {
                return res.status(400).json({
                    success: false,
                    code: 2004,
                    message:
                        "Đăng bài thất bại. Định dạng file không hợp lệ. Chỉ chấp nhận .jpg, .jpeg, .png, .mp4.",
                });
            }

            const fileSize = file.data.length;
            if (fileSize > maxFileSize) {
                return res.status(400).json({
                    success: false,
                    code: 2005,
                    message:
                        "Đăng bài thất bại. Kích thước file vượt quá giới hạn cho phép (10MB).",
                });
            }

            const result = await new Promise((resolve) => {
                cloudinary.uploader
                    .upload_stream(
                        { resource_type: "auto", folder: "post_imgs" },
                        (error, uploadResult) => {
                            if (error) {
                                console.log(error);
                                return res.status(400).json({
                                    success: false,
                                    code: 2024,
                                    message: "Lỗi lưu ảnh lên cloundinary.",
                                });
                            }
                            return resolve(uploadResult);
                        }
                    )
                    .end(file.data);
            });

            postImages.push({
                publicId: result.public_id,
                url: result.secure_url,
            });
        }

        if (!group.approve_post) {
            const currentDate = new Date();
            const post = await Post.create({
                user_id: req.user._id,
                ...req.body,
                create_post_time: currentDate,
                post_img: postImages,
                group_id: groupId,
                privacy: 3,
                is_approved: true,
            });

            return res.status(201).json({
                success: true,
                message: "Đăng bài thành công.",
                post,
            });
        }

        const currentDate = new Date();
        const post = await Post.create({
            user_id: req.user._id,
            ...req.body,
            create_post_time: currentDate,
            post_img: postImages,
            group_id: groupId,
            privacy: 3,
            is_approved: false,
        });

        // const content =
        //     req.user.first_name +
        //     " " +
        //     req.user.last_name +
        //     " vừa mới đăng bài.";

        // const noti = await Notification.create({
        //     user_id: req.user._id,
        //     noti_content: content,
        //     post_id: post._id,
        //     noti_create_time: currentDate,
        // });

        // const followerUsers = await Follow.find({
        //     user_id: req.user._id,
        // }).select("follower_user_id");

        // const followerUserIds = followerUsers
        //     .map((follow) => follow.follower_user_id)
        //     .flat();

        // for (const userId of followerUserIds) {
        //     await Noti_user.findOneAndUpdate(
        //         { user_id: userId },
        //         { $push: { detail: { noti_id: noti._id } } },
        //         { new: true, upsert: true }
        //     );
        // }

        // for (const userId of followerUserIds) {
        //     console.log("id" + userId.toString());
        //     req.app.get("io").emit(userId.toString(), {
        //         content: content,
        //         post_id: post._id,
        //     });
        // }

        // req.app.get('io').emit('notis', { content: content, post_id: post._id});

        return res.status(201).json({
            success: true,
            message: "Đăng bài thành công.",
            post,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10029,
            message: "Đăng bài thất bại :" + error.message,
        });
    }
};

exports.adminGetQueuePost = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const { size } = req.query;
        const group = await Group.findById(groupId).lean();

        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        const queue = Post.find({
            group_id: groupId,
            is_approved: false,
        })
            .sort({ create_post_time: -1 })
            .select("-post_img.publicId -post_img._id")
            .populate("user_id", "first_name last_name avatar.url");

        const apiFeatures = new PostAPIFeatures(posts, req.query);

        let allPosts = await apiFeatures.query;
        const totals = allPosts.length;

        const apiFeaturesPagination = new PostAPIFeatures(
            Post.find(posts),
            req.query
        ).pagination(size);

        allPosts = await apiFeaturesPagination.query;

        return res.status(200).json({
            success: true,
            totals,
            posts: allPosts,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10030,
            message: "Admin lấy danh sách bài viết cần duyệt :" + error.message,
        });
    }
};

exports.adminApprovePost = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const postId = req.params.post_id;
        const group = await Group.findById(groupId).lean();
        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        const post = await Post.findById(postId).lean();
        if (!post) {
            return res.status(404).json({
                success: false,
                code: 2010,
                message: "Không tìm thấy bài viết.",
            });
        }

        if (post.privacy != 3 && post.group_id != groupId) {
            return res.status(400).json({
                success: false,
                code: 10032,
                message: "Bài viết này không phải bài viết trong nhóm của bạn",
            });
        }

        if (post.is_approved) {
            return res.status(400).json({
                success: false,
                code: 10033,
                message: "Bài viết này đã được duyệt",
            });
        }

        const currentDate = new Date();
        await Post.findByIdAndUpdate(postId, {
            create_post_time: currentDate,
            is_approved: true,
        });

        return res.status(200).json({
            success: true,
            message: "Duyệt thành công.",
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10031,
            message: "Admin duyệt bài thất bại :" + error.message,
        });
    }
};

//10035
