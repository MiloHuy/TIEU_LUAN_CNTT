const Group = require("../models/Group");
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
const path = require("path");
const SuperAdminGroup = require("../models/SuperAdminGroup");
const GuestGroup = require("../models/GuestGroup");
const AdminGroup = require("../models/AdminGroup");
const MemberGroup = require("../models/MemberGroup");
const User = require("../models/User");
const Post = require("../models/Post");
const {
    PostAPIFeatures,
    AdminGroupAPIFeatures,
    UserAPIFeatures,
} = require("../utils/APIFeatures");
const Post_liked = require("../models/Post_liked");
const Post_stored = require("../models/Post_stored");
const Notification = require("../models/Notification");
const Noti_user = require("../models/Noti_user");
const Comment = require("../models/Comment");
const Comment_liked = require("../models/Comment_like");

const validImageFormats = ["jpg", "jpeg", "png", "mp4"];
const maxFileSize = 10 * 1024 * 1024;
exports.create = async (req, res) => {
    try {
        const { name, privacy, regulation, approve_post } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                code: 10026,
                message: "Tạo nhóm thất bại. Phải có tên nhóm.",
            });
        }
        const privacyValue = Number(privacy);
        if (
            privacyValue == undefined ||
            (privacyValue !== 1 && privacyValue !== 2)
        ) {
            return res.status(400).json({
                success: false,
                code: 10005,
                message: "Tạo nhóm thất bại. Giá trị privacy phải là 1 hoặc 2.",
            });
        }
        let Avatar = null;
        const groupAvatar = req.files?.group_avatar;
        if (groupAvatar) {
            const fileExtension = path.extname(groupAvatar.name).toLowerCase();
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

            const fileSize = groupAvatar.data.length;
            if (fileSize > maxFileSize) {
                return res.status(400).json({
                    success: false,
                    code: 10004,
                    message:
                        "Tạo nhóm thất bại. Kích thước file vượt quá giới hạn cho phép (10MB).",
                });
            }

            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream(
                        { resource_type: "auto", folder: "group_avatar" },
                        (error, uploadResult) => {
                            if (error) {
                                return reject(error);
                            }
                            resolve(uploadResult);
                        }
                    )
                    .end(groupAvatar.data);
            });

            Avatar = {
                publicId: result.public_id,
                url: result.secure_url,
            };
        }

        const group = await Group.create({
            avatar: Avatar,
            super_admin: req.user._id,
            name,
            privacyValue,
            regulation,
            approve_post,
        });

        return res.status(200).json({
            success: true,
            message: "Tạo nhóm thành công.",
            group_id: group._id,
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
        const userId = req.user._id;

        const group = await Group.findById(groupId).lean();
        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        let rolePermission = null;
        let isActive = null;
        let isRequest = false;

        if (group.super_admin.equals(userId)) {
            rolePermission = await SuperAdminGroup.findOne({
                role: "super-admin",
            })
                .select("-_id -__v")
                .lean();
            return res.status(200).json({
                success: true,
                role_permisson: rolePermission,
            });
        }

        const admin = group.admin.find((admin) => admin.user_id.equals(userId));
        if (admin) {
            isActive = admin.is_active;
            rolePermission = admin.role_permisson;
            return res.status(200).json({
                success: true,
                role_permisson: rolePermission,
                is_active: isActive,
            });
        }

        const member = group.member.find((member) =>
            member.user_id.equals(userId)
        );
        if (member) {
            isActive = member.is_active;
            rolePermission = await MemberGroup.findOne({ role: "member" })
                .select("-_id -__v")
                .lean();
            return res.status(200).json({
                success: true,
                role_permisson: rolePermission,
                is_active: isActive,
            });
        }

        if (group.privacy === 1) {
            rolePermission = await GuestGroup.findOne({ role: "guest" })
                .select("-_id -__v")
                .lean();
            rolePermission.permission.Post = undefined;
            rolePermission.permission.Interact = undefined;
            isRequest = group.request_join.some((request) =>
                request.user_id.equals(userId)
            );
            return res.status(200).json({
                success: true,
                role_permisson: rolePermission,
                is_request: isRequest,
            });
        }

        rolePermission = await GuestGroup.findOne({ role: "guest" })
            .select("-_id -__v")
            .lean();
        isRequest = group.request_join.some((request) =>
            request.user_id.equals(userId)
        );
        return res.status(200).json({
            success: true,
            role_permisson: rolePermission,
            is_request: isRequest,
        });
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

        const numberOfMembers =
            1 + (group.member?.length || 0) + (group.admin?.length || 0);

        group.number_of_members = numberOfMembers;

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
        const { size = 10, page = 1 } = req.query;
        const group = await Group.findById(groupId)
            .select("super_admin member.user_id admin.user_id")
            .populate(
                "member.user_id super_admin admin.user_id",
                "first_name last_name avatar.url id department"
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

        const skip = (page - 1) * size;
        const paginated_members = members.slice(skip, skip + size);
        const totals = members.length;

        return res.status(200).json({
            success: true,
            totals,
            members: paginated_members,
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
        const userId = req.user._id;

        const group = await Group.findById(groupId)
            .select("member admin super_admin request_join")
            .lean();

        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        const isMemberOrAdmin =
            group.member.some((member) => member.user_id.equals(userId)) ||
            group.admin.some((admin) => admin.user_id.equals(userId)) ||
            group.super_admin.equals(userId);

        if (isMemberOrAdmin) {
            return res.status(401).json({
                success: false,
                code: 10014,
                message: "Bạn đã là thành viên của nhóm.",
            });
        }

        const isRequesting = group.request_join.some((request) =>
            request.user_id.equals(userId)
        );

        const update = isRequesting
            ? { $pull: { request_join: { user_id: userId } } }
            : { $push: { request_join: { user_id: userId } } };

        await Group.findByIdAndUpdate(groupId, update);

        return res.status(200).json({
            success: true,
            message: isRequesting
                ? "Hủy yêu cầu vào nhóm thành công."
                : "Yêu cầu vào nhóm thành công.",
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
        const group = await Group.findById(groupId).lean();
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
        const userId = req.user._id;
        const { size = 10, page = 1 } = req.query;
        const skip = size * (page - 1);

        // const group = await Group.findById(groupId).lean();

        const [group, allPosts, totals, likedPosts, storedPosts] =
            await Promise.all([
                Group.findById(groupId).lean(),
                Post.find({
                    group_id: groupId,
                    is_approved: true,
                })
                    .sort({ create_post_time: -1 })
                    .select("-post_img.publicId -post_img._id")
                    .populate("user_id", "first_name last_name avatar.url")
                    .limit(Number(size))
                    .skip(skip),
                Post.countDocuments({
                    group_id: groupId,
                    is_approved: true,
                }),
                Post_liked.find({ user_id: userId }).select("post_id"),
                Post_stored.find({ user_id: userId }).select("post_id"),
            ]);

        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        const likedPostIds = new Set(
            likedPosts.map((like) => like.post_id.toString())
        );
        const storedPostIds = new Set(
            storedPosts.flatMap((store) =>
                store.post_id.map((id) => id.toString())
            )
        );

        const postsWithLikesAndStores = await Promise.all(
            allPosts.map(async (post) => {
                const postId = post._id.toString();
                const isLiked = likedPostIds.has(postId);
                const isStored = storedPostIds.has(postId);

                const post_like = await Post_liked.findOne({
                    post_id: post._id,
                });
                const likes = post_like ? post_like.user_id.length : 0;

                return {
                    ...post.toObject(),
                    liked: isLiked,
                    stored: isStored,
                    likes,
                };
            })
        );

        return res.status(200).json({
            success: true,
            totals,
            posts: postsWithLikesAndStores,
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
        const userId = req.user._id;

        const [group, post] = await Promise.all([
            Group.findById(groupId).lean(),
            Post.findById(postId)
                .sort({ create_post_time: -1 })
                .select("-post_img.publicId -post_img._id")
                .populate("user_id", "first_name last_name avatar.url")
                .lean(),
        ]);

        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        if (!post) {
            return res.status(404).json({
                success: false,
                code: 2001,
                message: "Không tìm thấy bài viết.",
            });
        }

        if (post.privacy != 3 && post.group_id != groupId) {
            return res.status(400).json({
                success: false,
                code: 10032,
                message: "Bài viết không phải của nhóm này.",
            });
        }

        if (!post.is_approved) {
            return res.status(500).json({
                success: false,
                code: 10037,
                message: "Không thể xem bài viết chưa được duyệt",
            });
        }

        const [checkLiked, checkStored, postLikes] = await Promise.all([
            Post_liked.findOne({ post_id: postId, user_id: userId }).lean(),
            Post_stored.findOne({ post_id: postId, user_id: userId }).lean(),
            Post_liked.findOne({ post_id: postId }).lean(),
        ]);

        post.liked = !!checkLiked;
        post.stored = !!checkStored;
        post.likes = postLikes ? postLikes.user_id.length : 0;

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

exports.likePost = async (req, res) => {
    try {
        const { gr_id: groupId, post_id: postId } = req.params;
        const userId = req.user._id;

        const [group, post, liked] = await Promise.all([
            Group.findById(groupId).lean(),
            Post.findById(postId)
                .sort({ create_post_time: -1 })
                .select("-post_img.publicId -post_img._id")
                .populate("user_id", "first_name last_name avatar.url"),
            Post_liked.findOneAndUpdate(
                { post_id: postId },
                {},
                { new: true, upsert: true }
            ),
        ]);

        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        if (!post) {
            return res.status(404).json({
                success: false,
                code: 2001,
                message: "Không tìm thấy bài viết.",
            });
        }

        if (post.privacy !== 3 && post.group_id.toString() !== groupId) {
            return res.status(400).json({
                success: false,
                code: 10032,
                message: "Bài viết không phải của nhóm này.",
            });
        }

        if (group.privacy === 1) {
            const isMember = group.member.some((member) =>
                member.user_id.equals(userId)
            );
            const isAdmin = group.admin.some((admin) =>
                admin.user_id.equals(userId)
            );
            const isSuperAdmin = group.super_admin.equals(userId);

            if (!(isMember || isAdmin || isSuperAdmin)) {
                return res.status(400).json({
                    success: false,
                    code: 10042,
                    message:
                        "Không thể thao tác. Bài viết trong nhóm riêng tư. Bạn chưa vào nhóm",
                });
            }
        }

        if (!post.is_approved) {
            return res.status(400).json({
                success: false,
                code: 10039,
                message: "Không thể thao tác với bài viết chưa được duyệt",
            });
        }

        const userIdSet = new Set(liked.user_id.map((id) => id.toString()));
        const isLiked = userIdSet.has(userId.toString());

        if (isLiked) {
            userIdSet.delete(userId.toString());
            liked.user_id = Array.from(userIdSet);
            await liked.save();

            const noti = await Notification.findOneAndDelete({
                user_id: userId,
                post_id: postId,
            });

            if (noti) {
                await Noti_user.findOneAndUpdate(
                    { user_id: post.user_id },
                    { $pull: { detail: { noti_id: noti._id } } },
                    { new: true, upsert: true }
                );
            }

            const likes = liked.user_id.length;
            return res.status(201).json({
                success: true,
                message: "Bỏ yêu thích.",
                likes,
            });
        } else {
            userIdSet.add(userId.toString());
            liked.user_id = Array.from(userIdSet);
            await liked.save();

            if (!post.user_id.equals(userId)) {
                const currentDate = new Date();
                const content = `${req.user.first_name} ${req.user.last_name} yêu thích bài viết của bạn.`;

                const noti = await Notification.create({
                    user_id: userId,
                    noti_content: content,
                    post_id: post._id,
                    noti_create_time: currentDate,
                });

                await Noti_user.findOneAndUpdate(
                    { user_id: post.user_id },
                    { $push: { detail: { noti_id: noti._id } } },
                    { new: true, upsert: true }
                );
            }

            const likes = liked.user_id.length;
            return res.status(201).json({
                success: true,
                message: "Yêu thích bài viết thành công.",
                likes,
            });
        }
    } catch (error) {
        console.error("Lỗi:", error);
        return res.status(500).json({
            success: false,
            code: 10047,
            message: "Yêu thích bài viết thất bại " + error.message,
        });
    }
};

exports.storePost = async (req, res) => {
    try {
        const { gr_id: groupId, post_id: postId } = req.params;
        const userId = req.user._id;

        const [group, post, stored] = await Promise.all([
            Group.findById(groupId).lean(),
            Post.findById(postId)
                .sort({ create_post_time: -1 })
                .select("-post_img.publicId -post_img._id")
                .populate("user_id", "first_name last_name avatar.url")
                .lean(),
            Post_stored.findOneAndUpdate(
                { user_id: userId },
                {},
                { new: true, upsert: true }
            ),
        ]);

        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        if (!post) {
            return res.status(404).json({
                success: false,
                code: 2001,
                message: "Không tìm thấy bài viết.",
            });
        }

        if (post.privacy !== 3 && post.group_id.toString() !== groupId) {
            return res.status(400).json({
                success: false,
                code: 10032,
                message: "Bài viết không phải của nhóm này.",
            });
        }

        if (group.privacy === 1) {
            const isMember = group.member.some((member) =>
                member.user_id.equals(userId)
            );
            const isAdmin = group.admin.some((admin) =>
                admin.user_id.equals(userId)
            );
            const isSuperAdmin = group.super_admin.equals(userId);

            if (!(isMember || isAdmin || isSuperAdmin)) {
                return res.status(400).json({
                    success: false,
                    code: 10042,
                    message:
                        "Không thể thao tác. Bài viết trong nhóm riêng tư. Bạn chưa vào nhóm",
                });
            }
        }

        if (!post.is_approved) {
            return res.status(400).json({
                success: false,
                code: 10039,
                message: "Không thể thao tác với bài viết chưa được duyệt",
            });
        }

        if (stored.post_id.includes(postId)) {
            stored.post_id.pull(postId);
            await stored.save();
            return res.status(201).json({
                success: true,
                message: "Bỏ lưu bài viết.",
            });
        } else {
            stored.post_id.push(postId);
            await stored.save();
            return res.status(201).json({
                success: true,
                message: "Lưu bài viết thành công.",
            });
        }
    } catch (error) {
        console.error("Lỗi:", error);
        return res.status(500).json({
            success: false,
            code: 10043,
            message: "Lưu bài viết thất bại " + error.message,
        });
    }
};

exports.commentPost = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const postId = req.params.post_id;
        const userId = req.user._id;
        const group = await Group.findById(groupId).lean();
        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        const post = await Post.findById(postId)
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

        if (post.privacy != 3 && post.group_id != groupId) {
            return res.status(400).json({
                success: false,
                code: 10032,
                message: "Bài viết không phải của nhóm này.",
            });
        }

        if (group.privacy == 1) {
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
                    code: 10042,
                    message:
                        "Không thể thao tác. Bài viết trong nhóm riêng tư. Bạn chưa vào nhóm",
                });
            }
        }

        if (post.is_approved == false) {
            return res.status(400).json({
                success: false,
                code: 10039,
                message: "Không thể thao tác với bài viết chưa được duyệt",
            });
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                code: 8003,
                message: "Thao tác thất bại. Thiếu nội dung",
            });
        }

        const currentDate = new Date();
        const comment = await Comment.create({
            user_id: userId,
            post_id: postId,
            ...req.body,
            create_comment_time: currentDate,
        });

        if (!post.user_id.equals(req.user._id)) {
            const content =
                req.user.first_name +
                " " +
                req.user.last_name +
                " bình luận bài viết của bạn.";

            const noti = await Notification.create({
                user_id: req.user._id,
                noti_content: content,
                post_id: post._id,
                noti_create_time: currentDate,
            });
            await Noti_user.findOneAndUpdate(
                { user_id: post.user_id },
                { $push: { detail: { noti_id: noti._id } } },
                { new: true, upsert: true }
            );
        }

        return res.status(201).json({
            success: true,
            message: "Comment thành công.",
        });
    } catch (error) {
        console.error("Lỗi:", error);
        return res.status(500).json({
            success: false,
            code: 10044,
            message: "Bình luận thất bại " + error.message,
        });
    }
};

exports.getCommentPost = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const postId = req.params.post_id;
        const userId = req.user._id;

        const [group, post] = await Promise.all([
            Group.findById(groupId).lean(),
            Post.findById(postId)
                .sort({ create_post_time: -1 })
                .select("-post_img.publicId -post_img._id")
                .populate("user_id", "first_name last_name avatar.url")
                .lean(),
        ]);

        if (!group) {
            return res.status(404).json({
                success: false,
                code: 10000,
                message: "Không tìm thấy nhóm.",
            });
        }

        if (!post) {
            return res.status(404).json({
                success: false,
                code: 2001,
                message: "Không tìm thấy bài viết.",
            });
        }

        if (post.privacy != 3 && post.group_id != groupId) {
            return res.status(400).json({
                success: false,
                code: 10032,
                message: "Bài viết không phải của nhóm này.",
            });
        }

        if (group.privacy == 1) {
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
                    code: 10042,
                    message:
                        "Không thể thao tác. Bài viết trong nhóm riêng tư. Bạn chưa vào nhóm",
                });
            }
        }

        if (post.is_approved == false) {
            return res.status(400).json({
                success: false,
                code: 10039,
                message: "Không thể thao tác với bài viết chưa được duyệt",
            });
        }

        const [comments, check_liked] = await Promise.all([
            Comment.find({
                post_id: postId,
            })
                .populate("user_id", "first_name last_name avatar.url")
                .sort({ create_comment_time: -1 }),
            Comment_liked.find({
                user_id: req.user._id,
            })
                .select("comment_id -_id")
                .lean(),
        ]);

        const likedCommentIds = new Set(
            check_liked.map((like) => like.comment_id.toString())
        );

        const commentsWithLikes = await Promise.all(
            comments.map(async (comment) => {
                const isLiked = likedCommentIds.has(comment._id.toString());
                const comment_like = await Comment_liked.findOne({
                    comment_id: comment._id,
                });
                const likes = comment_like ? comment_like.user_id.length : 0;

                return {
                    ...comment.toObject(),
                    liked: isLiked,
                    likes,
                };
            })
        );

        return res.status(200).json({
            success: true,
            comments: commentsWithLikes,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        return res.status(500).json({
            success: false,
            code: 10045,
            message: "Xem bình luận thất bại " + error.message,
        });
    }
};

exports.getMyPosts = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const userId = req.user._id;
        const { size = 10, page = 1 } = req.query;
        const skip = size * (page - 1);

        const [allPosts, totals, likedPosts, storedPosts] = await Promise.all([
            Post.find({
                group_id: groupId,
                user_id: userId,
                is_approved: true,
            })
                .sort({ create_post_time: -1 })
                .select("-post_img.publicId -post_img._id")
                .populate("user_id", "first_name last_name avatar.url")
                .limit(Number(size))
                .skip(skip),
            Post.countDocuments({
                group_id: groupId,
                user_id: userId,
                is_approved: true,
            }),
            Post_liked.find({ user_id: userId }).select("post_id").lean(),
            Post_stored.find({ user_id: userId }).select("post_id").lean(),
        ]);

        const likedPostIds = new Set(
            likedPosts.map((like) => like.post_id.toString())
        );
        const storedPostIds = new Set(
            storedPosts.flatMap((store) =>
                store.post_id.map((id) => id.toString())
            )
        );

        const postsWithLikesAndStores = await Promise.all(
            allPosts.map(async (post) => {
                const postId = post._id.toString();
                const isLiked = likedPostIds.has(postId);
                const isStored = storedPostIds.has(postId);

                const post_like = await Post_liked.findOne({
                    post_id: post._id,
                });
                const likes = post_like ? post_like.user_id.length : 0;

                return {
                    ...post.toObject(),
                    liked: isLiked,
                    stored: isStored,
                    likes,
                };
            })
        );

        return res.status(200).json({
            success: true,
            totals,
            posts: postsWithLikesAndStores,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 1046,
            message: "Xem bài viết của tôi thất bại " + error.message,
        });
    }
};

exports.memberDeletePost = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const postId = req.params.post_id;
        const userId = req.user._id;
        const post = await Post.findById(postId);
        const group = await Group.findById(groupId);

        if (!post) {
            return res.status(404).json({
                success: false,
                code: 2022,
                message: "Không tìm thấy bài viết.",
            });
        }
        if (post.privacy != 3 && post.group_id != groupId) {
            return res.status(400).json({
                success: false,
                code: 10032,
                message: "Bài viết không phải của nhóm này.",
            });
        }
        const is_author = post.user_id.equals(userId);
        if (!is_author) {
            return res.status(400).json({
                success: false,
                code: 10061,
                message: "Không thể xóa bài viết của người khác.",
            });
        }

        const is_member = group.member.some((member) =>
            member.user_id.equals(userId)
        );
        if (is_member) {
            check_report = group.list_report.some((report) =>
                report.post_id.equals(postId)
            );

            report = group.list_report;

            if (check_report) {
                group.list_report.pull({ post_id: postId });
                await group.save();
            }
        }

        if (post.post_img.publicId) {
            await cloudinary.uploader.destroy(post.post_img.publicId);
        }
        await Post.deleteOne({ _id: postId });
        return res.status(201).json({
            success: true,
            message: "Xóa bài viết thành công.",
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10060,
            message: "Xoá bài viết thất bại :" + error.message,
        });
    }
};

exports.leaveGroup = async (req, res) => {
    try {
        const userId = req.user._id;
        const groupId = req.params.gr_id;

        await Promise.all([
            Group.findOneAndUpdate(
                {
                    _id: groupId,
                    $or: [
                        { "member.user_id": userId },
                        { "admin.user_id": userId },
                    ],
                },
                {
                    $pull: {
                        member: { user_id: userId },
                        admin: { user_id: userId },
                    },
                },
                { new: true }
            ).lean(),
            Post.deleteMany({
                user_id: userId,
                group_id: groupId,
            }),
        ]);

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

exports.createPost = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const group = req.group;

        if (!req.files) {
            return res.status(400).json({
                success: false,
                code: 2003,
                message:
                    "Đăng bài thất bại. Bài đăng phải có ít nhất một ảnh hoặc video.",
            });
        }

        if (!Array.isArray(req.files.post_img)) {
            req.files.post_img = [req.files.post_img];
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

        const currentDate = new Date();
        if (!group.approve_post) {
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
            });
        }

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

exports.reportPost = async (req, res) => {
    try {
        if (!req.body.reason) {
            return res.status(500).json({
                success: false,
                code: 1004,
                message: "Báo cáo thất bại, thiếu nội dung.",
            });
        }
        const groupId = req.params.gr_id;
        const postId = req.params.post_id;
        const userId = req.user._id;
        const group = req.group;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                code: 2001,
                message: "Không tìm thấy bài viết.",
            });
        }

        if (post.privacy != 3 && post.group_id != groupId) {
            return res.status(400).json({
                success: false,
                code: 10032,
                message: "Bài viết không phải của nhóm này.",
            });
        }

        if (post.is_approved == false) {
            return res.status(400).json({
                success: false,
                code: 10039,
                message: "Không thể thao tác với bài viết chưa được duyệt",
            });
        }

        const currentDate = new Date();
        const report = {
            post_id: postId,
            user_id: userId,
            reason: req.body.reason,
            create_report_time: currentDate,
        };

        group.list_report.push(report);
        await group.save();

        return res.status(201).json({
            success: true,
            message: "Báo cáo thành công.",
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10048,
            message: "Báo cáo bài viết thất bại :" + error.message,
        });
    }
};

exports.getWaitApprovePosts = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const userId = req.user._id;
        const { size = 10, page = 1 } = req.query;
        const skip = size * (page - 1);

        const query = {
            group_id: groupId,
            user_id: userId,
            is_approved: false,
        };

        const [posts, totals] = await Promise.all([
            Post.find(query)
                .sort({ create_post_time: -1 })
                .select("-post_img.publicId -post_img._id")
                .populate("user_id", "first_name last_name avatar.url")
                .skip(skip)
                .limit(Number(size)),
            Post.countDocuments(query),
        ]);

        return res.status(200).json({
            success: true,
            totals,
            posts,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10062,
            message: "Lấy bài viết chờ duyệt thất bại :" + error.message,
        });
    }
};

exports.puttWaitApprovePosts = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const postId = req.params.post_id;
        const userId = req.user._id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                code: 2022,
                message: "Không tìm thấy bài viết.",
            });
        }
        if (post.privacy != 3 && post.group_id != groupId) {
            return res.status(400).json({
                success: false,
                code: 10032,
                message: "Bài viết không phải của nhóm này.",
            });
        }
        const is_author = post.user_id.equals(userId);
        if (!is_author) {
            return res.status(400).json({
                success: false,
                code: 10064,
                message: "Không thể thao tác với bài viết của người khác.",
            });
        }

        if (!req.files) {
            return res.status(400).json({
                success: false,
                code: 2003,
                message:
                    "Cập nhật thất bại. Bài đăng phải có ít nhất một ảnh hoặc video.",
            });
        }

        if (!Array.isArray(req.files.post_img)) {
            req.files.post_img = [req.files.post_img];
        }

        if (post.post_img && post.post_img.length > 0) {
            await Promise.all(
                post.post_img.map(async (image) => {
                    if (image.publicId) {
                        await cloudinary.uploader.destroy(image.publicId);
                    }
                })
            );
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
                        "Cập nhật thất bại. Định dạng file không hợp lệ. Chỉ chấp nhận .jpg, .jpeg, .png, .mp4.",
                });
            }

            const fileSize = file.data.length;
            if (fileSize > maxFileSize) {
                return res.status(400).json({
                    success: false,
                    code: 2005,
                    message:
                        "Cập nhật thất bại. Kích thước file vượt quá giới hạn cho phép (10MB).",
                });
            }

            const result = await new Promise((resolve) => {
                cloudinary.uploader
                    .upload_stream(
                        { resource_type: "auto", folder: "post_imgs" },
                        (error, uploadResult) => {
                            if (error) {
                                // console.log(error);
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

        const description = req.body.post_description;

        await Post.updateOne(
            { _id: postId },
            { $set: { post_description: description, post_img: postImages } }
        );
        return res.status(201).json({
            success: true,
            message: "Cập nhật bài viết thành công.",
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10063,
            message: "Chỉnh sửa bài viết chờ duyệt thất bại :" + error.message,
        });
    }
};

exports.adminCreatePost = async (req, res) => {
    try {
        const groupId = req.params.gr_id;

        if (!req.files) {
            return res.status(400).json({
                success: false,
                code: 2003,
                message:
                    "Đăng bài thất bại. Bài đăng phải có ít nhất một ảnh hoặc video.",
            });
        }

        if (!Array.isArray(req.files.post_img)) {
            req.files.post_img = [req.files.post_img];
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
            post_id: post._id,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10080,
            message: "Admin đăng bài thất bại :" + error.message,
        });
    }
};

exports.inviteUser = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const group = req.group;

        const check_user = await User.findById(userId);

        if (!check_user) {
            return res.status(401).json({
                success: false,
                code: 10024,
                message: "Không tìm thấy người dùng",
            });
        }

        const memberIds = new Set(
            group.member.map((member) => member.user_id.toString())
        );
        const adminIds = new Set(
            group.admin.map((admin) => admin.user_id.toString())
        );
        const requestIds = new Set(
            group.request_join.map((request) => request.user_id.toString())
        );

        if (
            memberIds.has(userId) ||
            adminIds.has(userId) ||
            group.super_admin.equals(userId)
        ) {
            return res.status(401).json({
                success: false,
                code: 10010,
                message: "Người này đã vào nhóm.",
            });
        }

        const new_member = {
            user_id: userId,
        };

        if (requestIds.has(userId)) {
            group.request_join = group.request_join.filter(
                (request) => !request.user_id.equals(userId)
            );
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
        const group = req.group;

        const check_user = await User.findById(userId);

        if (!check_user) {
            return res.status(401).json({
                success: false,
                code: 10024,
                message: "Không tìm thấy người dùng",
            });
        }

        const memberIds = new Set(
            group.member.map((member) => member.user_id.toString())
        );
        const adminIds = new Set(
            group.admin.map((admin) => admin.user_id.toString())
        );
        const requestIds = new Set(
            group.request_join.map((request) => request.user_id.toString())
        );

        if (
            memberIds.has(userId) ||
            adminIds.has(userId) ||
            group.super_admin.equals(userId)
        ) {
            return res.status(401).json({
                success: false,
                code: 10018,
                message: "Người này đã là thành viên của nhóm.",
            });
        }

        if (!requestIds.has(userId)) {
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

        group.request_join = group.request_join.filter(
            (request) => !request.user_id.equals(userId)
        );

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
        const group = req.group;

        const check_user = await User.findById(userId).lean();

        if (!check_user) {
            return res.status(401).json({
                success: false,
                code: 10024,
                message: "Không tìm thấy người dùng",
            });
        }

        const memberIds = new Set(
            group.member.map((member) => member.user_id.toString())
        );
        const adminIds = new Set(
            group.admin.map((admin) => admin.user_id.toString())
        );
        const requestIds = new Set(
            group.request_join.map((request) => request.user_id.toString())
        );

        if (
            memberIds.has(userId) ||
            adminIds.has(userId) ||
            group.super_admin.equals(userId)
        ) {
            return res.status(401).json({
                success: false,
                code: 10018,
                message: "Người này đã là thành viên của nhóm.",
            });
        }

        if (!requestIds.has(userId)) {
            return res.status(404).json({
                success: false,
                code: 10017,
                message: "Người này không yêu cầu vào nhóm.",
            });
        }

        group.request_join = group.request_join.filter(
            (request) => !request.user_id.equals(userId)
        );

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

exports.adminGetMembers = async (req, res) => {
    try {
        // const groupId = req.params.gr_id;
        // const { size = 10, page = 1 } = req.query;

        // const [group, list_posts] = await Promise.all([
        //     Group.findById(groupId)
        //         .select("member")
        //         .populate(
        //             "member.user_id",
        //             "first_name last_name avatar.url department"
        //         )
        //         .lean(),
        //     Post.find({
        //         group_id: groupId,
        //         is_approved: true,
        //     }),
        // ]);

        // const postIds = list_posts.map((post) => post._id);
        // const members = group.member;

        // const membersWithPostCounts = await Promise.all(
        //     members.map(async (member) => {
        //         const postCount = await Post.countDocuments({
        //             user_id: member.user_id._id,
        //             group_id: groupId,
        //             is_approved: true,
        //         });
        //         const likeCount = await Post_liked.countDocuments({
        //             user_id: member.user_id._id,
        //             post_id: { $in: postIds },
        //         });
        //         const cmtCount = await Comment.countDocuments({
        //             user_id: member.user_id._id,
        //             post_id: { $in: postIds },
        //         });
        //         return {
        //             ...member,
        //             post_count: postCount,
        //             like_count: likeCount,
        //             cmt_count: cmtCount,
        //         };
        //     })
        // );

        // const filteredMembers = await membersWithPostCounts.map((member) => {
        //     return {
        //         user_id: member.user_id,
        //         is_active: member.is_active,
        //         post_count: member.post_count,
        //         like_count: member.like_count,
        //         cmt_count: member.cmt_count,
        //     };
        // });

        // const skip = (page - 1) * size;
        // const paginated_members = filteredMembers.slice(skip, skip + size);
        // const totals = filteredMembers.length;

        // return res.status(200).json({
        //     success: true,
        //     totals,
        //     members: paginated_members,
        // });

        const groupId = req.params.gr_id;
        const { size = 10, page = 1 } = req.query;

        const [group, posts] = await Promise.all([
            Group.findById(groupId)
                .select("member")
                .populate(
                    "member.user_id",
                    "first_name last_name avatar.url department"
                )
                .lean(),
            Post.find({
                group_id: groupId,
                is_approved: true,
            })
                .select("_id user_id")
                .lean(),
        ]);

        const postIds = posts.map((post) => post._id);
        const members = group.member;

        const postCounts = posts.reduce((acc, post) => {
            acc[post.user_id] = (acc[post.user_id] || 0) + 1;
            return acc;
        }, {});

        const memberUserIds = members.map((member) => member.user_id._id);

        const [likeCounts, cmtCounts] = await Promise.all([
            Post_liked.aggregate([
                {
                    $match: {
                        user_id: { $in: memberUserIds },
                        post_id: { $in: postIds },
                    },
                },
                { $group: { _id: "$user_id", count: { $sum: 1 } } },
            ]),
            Comment.aggregate([
                {
                    $match: {
                        user_id: { $in: memberUserIds },
                        post_id: { $in: postIds },
                    },
                },
                { $group: { _id: "$user_id", count: { $sum: 1 } } },
            ]),
        ]);

        const likeCountMap = likeCounts.reduce((acc, like) => {
            acc[like._id] = like.count;
            return acc;
        }, {});

        const cmtCountMap = cmtCounts.reduce((acc, cmt) => {
            acc[cmt._id] = cmt.count;
            return acc;
        }, {});

        const membersWithCounts = members.map((member) => {
            const userId = member.user_id._id;
            return {
                user_id: member.user_id,
                is_active: member.is_active,
                post_count: postCounts[userId] || 0,
                like_count: likeCountMap[userId] || 0,
                cmt_count: cmtCountMap[userId] || 0,
            };
        });

        const skip = (page - 1) * size;
        const paginatedMembers = membersWithCounts.slice(skip, skip + size);

        return res.status(200).json({
            success: true,
            totals: membersWithCounts.length,
            members: paginatedMembers,
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
        const group = req.group;

        const admin = group.admin.find(
            (admin) => admin.user_id.toString() === userId
        );

        if (admin) {
            return res.status(404).json({
                success: false,
                code: 10021,
                message: "Không thể thao tác. Người này cũng là admin",
            });
        }

        const is_member = group.member.find(
            (member) => member.user_id._id.toString() === userId
        );

        if (!is_member) {
            return res.status(404).json({
                success: false,
                code: 10027,
                message: "Người này không phải thành viên của nhóm",
            });
        }

        new_status = !is_member.is_active;

        const updatedGroup = await Group.findOneAndUpdate(
            { _id: groupId, "member.user_id": userId },
            { $set: { "member.$.is_active": new_status } },
            { new: true }
        ).lean();

        const new_member = updatedGroup.member.find(
            (member) => member.user_id._id.toString() === userId
        );

        return res.status(200).json({
            success: true,
            member: new_member,
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

        const group = req.group;

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

        return res.status(200).json({
            success: true,
            message: "Admin xóa thành công.",
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
        const { size = 10, page = 1 } = req.query;
        const skip = size * (page - 1);

        const [posts, totals] = await Promise.all([
            Post.find({
                group_id: groupId,
                is_approved: true,
            })
                .sort({ create_post_time: -1 })
                .select("-post_img.publicId -post_img._id")
                .populate("user_id", "first_name last_name avatar.url")
                .limit(Number(size))
                .skip(skip),
            Post.countDocuments({
                group_id: groupId,
                is_approved: true,
            }),
        ]);

        res.status(200).json({
            success: true,
            totals,
            posts,
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

exports.adminGetQueuePost = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const { size = 10, page = 1 } = req.query;
        const skip = size * (page - 1);

        const [posts, totals] = await Promise.all([
            Post.find({
                group_id: groupId,
                is_approved: false,
            })
                .sort({ create_post_time: -1 })
                .select("-post_img.publicId -post_img._id")
                .populate("user_id", "first_name last_name avatar.url")
                .limit(Number(size))
                .skip(skip),
            Post.countDocuments({
                group_id: groupId,
                is_approved: false,
            }),
        ]);

        return res.status(200).json({
            success: true,
            totals,
            posts,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10030,
            message:
                "Admin lấy danh sách bài viết cần duyệt thất bại :" +
                error.message,
        });
    }
};

exports.adminGetListReport = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const { size = 10, page = 1 } = req.query;
        const skip = size * (page - 1);

        const group = await Group.findById(groupId)
            .populate({
                path: "list_report.user_id",
                select: "first_name last_name avatar.url",
            })
            .populate({
                path: "list_report.post_id",
                populate: {
                    path: "user_id",
                    select: "first_name last_name avatar.url",
                },
                select: "post_description post_img.url user_id",
            })
            .lean();

        const list_report = group.list_report;
        const totals = list_report.length;

        const paginated_reports = list_report.slice(skip, skip + size);

        return res.status(200).json({
            success: true,
            totals,
            list_report: paginated_reports,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10049,
            message:
                "Admin lấy danh sách báo cáo bài viết thất bại :" +
                error.message,
        });
    }
};

exports.adminApprovePost = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const postId = req.params.post_id;

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
                message: "Bài viết không phải của nhóm này.",
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

exports.adminDeletePost = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const postId = req.params.post_id;
        const post = await Post.findById(postId);
        const group = req.group;

        if (!post) {
            return res.status(404).json({
                success: false,
                code: 2022,
                message: "Không tìm thấy bài viết.",
            });
        }
        if (post.privacy != 3 && post.group_id != groupId) {
            return res.status(400).json({
                success: false,
                code: 10032,
                message: "Bài viết không phải của nhóm này.",
            });
        }
        if (post.user_id.equals(group.super_admin)) {
            return res.status(500).json({
                success: false,
                code: 10040,
                message: "Bạn không thể xóa bài viết của super admin.",
            });
        }

        check_report = group.list_report.some((report) =>
            report.post_id.equals(postId)
        );

        report = group.list_report;

        if (check_report) {
            group.list_report.pull({ post_id: postId });
            await group.save();
        }

        if (post.post_img.publicId) {
            await cloudinary.uploader.destroy(post.post_img.publicId);
        }

        const currentDate = new Date();
        const content = "Bài viết của bạn đã bị admin xóa.";
        const noti = await Notification.create({
            user_id: req.user._id,
            noti_content: content,
            post_id: postId,
            noti_create_time: currentDate,
        });

        await Noti_user.findOneAndUpdate(
            { user_id: post.user_id },
            { $push: { detail: { noti_id: noti._id } } },
            { new: true, upsert: true }
        );

        // const noti = await Notification.findOneAndDelete({
        //     user_id: post.user_id,
        //     post_id: req.params.id,
        // });
        // if (noti) {
        //     const follower_Users = await Follow.find({
        //         user_id: req.user._id,
        //     }).select("follower_user_id");

        //     const follower_user_ids = follower_Users
        //         .map((follow) => follow.follower_user_id)
        //         .flat();

        //     for (const user_id of follower_user_ids) {
        //         await Noti_user.findOneAndUpdate(
        //             { user_id: user_id },
        //             { $pull: { detail: { noti_id: noti._id } } },
        //             { new: true, upsert: true }
        //         );
        //     }
        // }

        await Post.deleteOne({ _id: postId });
        return res.status(201).json({
            success: true,
            message: "Xóa bài viết thành công.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 10038,
            message: "Xóa bài viết thất bại : " + error.message,
        });
    }
};

exports.adminGetStatisticMember = async (req, res) => {
    try {
        const group = req.group;
        const count_members = group.member.length;
        return res.status(201).json({
            success: true,
            count_members,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 10065,
            message: "Thống kê thành viên thất bại : " + error.message,
        });
    }
};

exports.adminGetStatisticPost = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const posts = await Post.find({
            group_id: groupId,
            is_approved: true,
        });
        const count_posts = posts.length;
        return res.status(201).json({
            success: true,
            count_posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 10066,
            message: "Thống kê bài viết thất bại : " + error.message,
        });
    }
};

exports.adminGetStatisticComment = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const posts = await Post.find({
            group_id: groupId,
            is_approved: true,
        });
        const posts_id = posts.map((post) => post._id).flat();
        const comments = await Comment.find({ post_id: { $in: posts_id } });
        const count_comments = comments.length;
        return res.status(201).json({
            success: true,
            count_comments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 10067,
            message: "Thống kê bài viết thất bại : " + error.message,
        });
    }
};

exports.adminGetStatisticLike = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const posts = await Post.find({
            group_id: groupId,
            is_approved: true,
        });
        const posts_id = posts.map((post) => post._id).flat();
        const like = await Post_liked.find({ post_id: { $in: posts_id } });
        const count_likes = like.reduce((total, likeItem) => {
            return total + likeItem.user_id.length;
        }, 0);
        return res.status(201).json({
            success: true,
            count_likes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 10068,
            message: "Thống kê bài viết thất bại : " + error.message,
        });
    }
};

exports.adminEditRegulation = async (req, res) => {
    try {
        const group = req.group;
        const regulation = req.body.regulation;
        group.regulation = regulation;
        await group.save();
        return res.status(200).json({
            success: true,
            regulation: group.regulation,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 10076,
            message: "Thống kê bài viết thất bại : " + error.message,
        });
    }
};

exports.addAdmin = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const group = req.group;
        // const check_admin = group.admin.find(
        //     (admin) => admin.user_id.toString() === userId
        // );

        const memberIds = new Set(
            group.member.map((member) => member.user_id.toString())
        );
        const adminIds = new Set(
            group.admin.map((admin) => admin.user_id.toString())
        );

        const check_user = await User.findById(userId);

        if (!check_user) {
            return res.status(401).json({
                success: false,
                code: 10024,
                message: "Không tìm thấy người dùng",
            });
        }

        if (!(memberIds.has(userId) || adminIds.has(userId))) {
            return res.status(401).json({
                success: false,
                code: 10005,
                message: "Không có người này trong nhóm.",
            });
        }

        if (adminIds.has(userId)) {
            return res.status(401).json({
                success: false,
                code: 10008,
                message: "Bạn đã thêm người này làm admin.",
            });
        }

        const admin = await AdminGroup.findOne({ role: "admin" });

        const new_admin = {
            user_id: userId,
            role_permisson: admin.role_permisson,
        };
        group.admin.push(new_admin);
        group.member = group.member.filter(
            (member) => member.user_id.toString() !== userId
        );

        await group.save();

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

exports.getAdmin = async (req, res) => {
    try {
        //         const groupId = req.params.gr_id;
        //         const { size = 10, page = 1 } = req.query;
        //         const [group, list_posts] = await Promise.all([
        //             Group.findById(groupId)
        //                 .select("admin")
        //                 .populate(
        //                     "admin.user_id",
        //                     "first_name last_name avatar.url department"
        //                 )
        //                 .lean(),
        //             Post.find({
        //                 group_id: groupId,
        //                 is_approved: true,
        //             }),
        //         ]);

        //         const postIds = list_posts.map((post) => post._id);
        //         const admins = group.admin;

        //         const adminsWithPostCounts = await Promise.all(
        //             admins.map(async (admin) => {
        //                 const postCount = await Post.countDocuments({
        //                     user_id: admin.user_id._id,
        //                     group_id: groupId,
        //                     is_approved: true,
        //                 });
        //                 const likeCount = await Post_liked.countDocuments({
        //                     user_id: admin.user_id._id,
        //                     post_id: { $in: postIds },
        //                 });
        //                 const cmtCount = await Comment.countDocuments({
        //                     user_id: admin.user_id._id,
        //                     post_id: { $in: postIds },
        //                 });
        //                 return {
        //                     ...admin,
        //                     post_count: postCount,
        //                     like_count: likeCount,
        //                     cmt_count: cmtCount,
        //                 };
        //             })
        //         );

        //         const filteredAdmins = await adminsWithPostCounts.map((admin) => {
        //             return {
        //                 user_id: admin.user_id,
        //                 is_active: admin.is_active,
        //                 post_count: admin.post_count,
        //                 like_count: admin.like_count,
        //                 cmt_count: admin.cmt_count,
        //             };
        //         });

        //         const skip = (page - 1) * size;
        //         const paginated_admins = filteredAdmins.slice(skip, skip + size);
        //         const totals = filteredAdmins.length;

        //         return res.status(200).json({
        //             success: true,
        //             totals,
        //             admins: paginated_admins,
        //         });
        const groupId = req.params.gr_id;
        const { size = 10, page = 1 } = req.query;

        const [group, posts] = await Promise.all([
            Group.findById(groupId)
                .select("admin")
                .populate(
                    "admin.user_id",
                    "first_name last_name avatar.url department"
                )
                .lean(),
            Post.find({
                group_id: groupId,
                is_approved: true,
            })
                .select("_id user_id")
                .lean(),
        ]);

        const postIds = posts.map((post) => post._id);
        const admins = group.admin;

        const postCounts = posts.reduce((acc, post) => {
            acc[post.user_id] = (acc[post.user_id] || 0) + 1;
            return acc;
        }, {});

        const adminUserIds = admins.map((admin) => admin.user_id._id);

        const [likeCounts, cmtCounts] = await Promise.all([
            Post_liked.aggregate([
                {
                    $match: {
                        user_id: { $in: adminUserIds },
                        post_id: { $in: postIds },
                    },
                },
                { $group: { _id: "$user_id", count: { $sum: 1 } } },
            ]),
            Comment.aggregate([
                {
                    $match: {
                        user_id: { $in: adminUserIds },
                        post_id: { $in: postIds },
                    },
                },
                { $group: { _id: "$user_id", count: { $sum: 1 } } },
            ]),
        ]);

        const likeCountMap = likeCounts.reduce((acc, like) => {
            acc[like._id] = like.count;
            return acc;
        }, {});

        const cmtCountMap = cmtCounts.reduce((acc, cmt) => {
            acc[cmt._id] = cmt.count;
            return acc;
        }, {});

        const adminsWithCounts = admins.map((admin) => {
            const userId = admin.user_id._id;
            return {
                user_id: admin.user_id,
                is_active: admin.is_active,
                post_count: postCounts[userId] || 0,
                like_count: likeCountMap[userId] || 0,
                cmt_count: cmtCountMap[userId] || 0,
            };
        });

        const skip = (page - 1) * size;
        const paginatedAdmins = adminsWithCounts.slice(skip, skip + size);

        return res.status(200).json({
            success: true,
            totals: adminsWithCounts.length,
            admins: paginatedAdmins,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10069,
            message: "Lấy danh sách admin thất bại :" + error.message,
        });
    }
};

exports.getAdminPermission = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const group = req.group;

        const check_user = await User.findById(userId);

        if (!check_user) {
            return res.status(401).json({
                success: false,
                code: 10024,
                message: "Không tìm thấy người dùng",
            });
        }

        const check_admin = group.admin.find(
            (admin) => admin.user_id.toString() === userId
        );

        if (!check_admin) {
            return res.status(401).json({
                success: false,
                code: 10071,
                message: "Người này không phải admin của nhóm.",
            });
        }

        const managePermissions = {};
        for (const [key, value] of Object.entries(
            check_admin.role_permisson.permission
        )) {
            if (key.startsWith("Manage")) {
                managePermissions[key] = value;
            }
        }

        return res.status(200).json({
            success: true,
            admin: managePermissions,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10081,
            message: "Lấy danh sách admin thất bại :" + error.message,
        });
    }
};

exports.searchAdmin = async (req, res) => {
    try {
        const { size = 10, page = 1, search } = req.query;
        const skip = size * (page - 1);
        const group = req.group;

        const adminIds = group.admin.map((admin) => admin.user_id._id);

        let searchQuery = { _id: { $in: adminIds } };

        if (search) {
            const searchRegex = new RegExp(search, "i");
            searchQuery = {
                ...searchQuery,
                $or: [
                    { first_name: searchRegex },
                    { last_name: searchRegex },
                    { department: searchRegex },
                ],
            };
        }

        const [totals, allUser] = await Promise.all([
            User.countDocuments(searchQuery),
            User.find(searchQuery)
                .select("avatar.url first_name last_name department")
                .limit(Number(size))
                .skip(skip),
        ]);

        return res.status(200).json({
            success: true,
            totals,
            admins: allUser,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10075,
            message: "Tìm kiếm thất bại:" + error.message,
        });
    }
};

exports.superEditActiveAdmin = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const userId = req.params.user_id;
        const group = req.group;

        const check_user = await User.findById(userId);

        if (!check_user) {
            return res.status(401).json({
                success: false,
                code: 10024,
                message: "Không tìm thấy người dùng",
            });
        }

        const admin = group.admin.find(
            (admin) => admin.user_id._id.toString() === userId
        );

        if (!admin) {
            return res.status(404).json({
                success: false,
                code: 10071,
                message: "Người này không phải admin của nhóm",
            });
        }

        new_status = !admin.is_active;

        const updatedGroup = await Group.findOneAndUpdate(
            { _id: groupId, "admin.user_id": userId },
            { $set: { "admin.$.is_active": new_status } },
            { new: true }
        )
            .select("admin.user_id admin.is_active")
            .populate("admin.user_id", "first_name last_name avatar.url");

        const new_admin = updatedGroup.admin.find(
            (admin) => admin.user_id._id.toString() === userId
        );

        return res.status(200).json({
            success: true,
            admin: new_admin,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10070,
            message: "Super admin vô hiệu/kích hoạt thất bại :" + error.message,
        });
    }
};

exports.superEditPermissionAdmin = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const group = req.group;

        const check_user = await User.findById(userId);

        if (!check_user) {
            return res.status(401).json({
                success: false,
                code: 10024,
                message: "Không tìm thấy người dùng",
            });
        }

        const check_admin = group.admin.find(
            (admin) => admin.user_id.toString() === userId
        );

        if (!check_admin) {
            return res.status(401).json({
                success: false,
                code: 10071,
                message: "Người này không phải admin của nhóm.",
            });
        }

        const admin = await AdminGroup.findOne({ role: "admin" });

        const permissions = req.body.permission;

        const permissionValues = {
            Manage_member: undefined,
            Manage_post: undefined,
            Manage_interact: undefined,
            Manage_regulation: undefined,
        };

        permissions.forEach((permission) => {
            if (permission in permissionValues) {
                permissionValues[permission] = admin.permission[permission];
            }
        });

        check_admin.role_permisson.permission.Manage_member =
            permissionValues.Manage_member;
        check_admin.role_permisson.permission.Manage_post =
            permissionValues.Manage_post;
        check_admin.role_permisson.permission.Manage_interact =
            permissionValues.Manage_interact;
        check_admin.role_permisson.permission.Manage_regulation =
            permissionValues.Manage_regulation;

        await group.save();

        const managePermissions = {};
        for (const [key, value] of Object.entries(
            check_admin.role_permisson.permission
        )) {
            if (key.startsWith("Manage")) {
                managePermissions[key] = value;
            }
        }

        return res.status(200).json({
            success: true,
            admin: managePermissions,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10073,
            message: "Super admin edit quyền thất bại :" + error.message,
        });
    }
};

exports.superAdminDeleteAdmin = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const userId = req.params.user_id;
        const group = req.group;

        const adminIds = new Set(
            group.admin.map((admin) => admin.user_id.toString())
        );

        if (!adminIds.has(userId)) {
            return res.status(404).json({
                success: false,
                code: 10071,
                message: "Người này không phải admin của nhóm",
            });
        }

        const updatedGroup = await Group.findOneAndUpdate(
            { _id: groupId },
            { $pull: { admin: { user_id: userId } } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Super admin xóa admin thành công.",
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10072,
            message: "Super admin xóa admin thất bại :" + error.message,
        });
    }
};

exports.changeAvatar = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const group = await Group.findById(groupId);
        if (!req.files) {
            return res.status(400).json({
                success: false,
                code: 2003,
                message:
                    "Cập nhật thất bại. Bài đăng phải có ít nhất một ảnh hoặc video.",
            });
        }
        const allowedExtensions = validImageFormats.map(
            (format) => `.${format}`
        );
        const fileExtension = path
            .extname(req.files.group_avatar.name)
            .toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            return res.status(400).json({
                success: false,
                code: 2004,
                message:
                    "Cập nhật thất bại. Định dạng ảnh không hợp lệ. Chỉ chấp nhận .jpg, .jpeg hoặc .png.",
            });
        }

        const fileSize = req.files.group_avatar.data.length;
        if (fileSize > maxFileSize) {
            return res.status(400).json({
                success: false,
                code: 2005,
                message:
                    "Cập nhật thất bại. Kích thước ảnh vượt quá giới hạn cho phép (10MB).",
            });
        }

        const result = await new Promise((resolve) => {
            cloudinary.uploader
                .upload_stream(
                    { resource_type: "auto", folder: "post_imgs" },
                    (error, uploadResult) => {
                        if (error) {
                            // console.log(error);
                            return res.status(400).json({
                                success: false,
                                code: 2024,
                                message: "Lỗi lưu ảnh lên cloundinary.",
                            });
                        }
                        return resolve(uploadResult);
                    }
                )
                .end(req.files.group_avatar.data);
        });

        const newAvatar = {
            publicId: result.public_id,
            url: result.secure_url,
        };

        if (group.avatar.publicId) {
            await cloudinary.uploader.destroy(group.avatar.publicId);
        }
        group.avatar = newAvatar;
        await group.save();

        return res.status(201).json({
            success: true,
            message: "Cập nhật avatar thành công.",
            avatar: group.avatar.url,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10077,
            message: "Cập nhật avatar thất bại :" + error.message,
        });
    }
};

exports.putSetting = async (req, res) => {
    try {
        const { name, privacy, approve_post } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                code: 10082,
                message: "Cập nhật thất bại. Phải có tên nhóm",
            });
        }
        const privacyValue = Number(privacy);
        if (
            privacyValue == undefined ||
            (privacyValue !== 1 && privacyValue !== 2)
        ) {
            return res.status(400).json({
                success: false,
                code: 10083,
                message: "Cập nhật thất bại. Giá trị privacy phải là 1 hoặc 2.",
            });
        }
        const groupId = req.params.gr_id;
        const group = await Group.findByIdAndUpdate(groupId, {
            privacyValue,
            approve_post,
        });
        return res.status(201).json({
            success: true,
            message: "Cập nhật thành công.",
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 10078,
            message: "Cập nhật avatar thất bại :" + error.message,
        });
    }
};

exports.SuperAdminDeletePost = async (req, res) => {
    try {
        const groupId = req.params.gr_id;
        const postId = req.params.post_id;
        const post = await Post.findById(postId);
        const group = req.group;

        if (!post) {
            return res.status(404).json({
                success: false,
                code: 2022,
                message: "Không tìm thấy bài viết.",
            });
        }
        if (post.privacy != 3 && post.group_id != groupId) {
            return res.status(400).json({
                success: false,
                code: 10032,
                message: "Bài viết không phải của nhóm này.",
            });
        }

        check_report = group.list_report.some((report) =>
            report.post_id.equals(postId)
        );

        report = group.list_report;

        if (check_report) {
            group.list_report.pull({ post_id: postId });
            await group.save();
        }

        if (post.post_img.publicId) {
            await cloudinary.uploader.destroy(post.post_img.publicId);
        }

        const currentDate = new Date();
        const content = "Bài viết của bạn đã bị admin xóa.";
        const noti = await Notification.create({
            user_id: req.user._id,
            noti_content: content,
            post_id: postId,
            noti_create_time: currentDate,
        });

        await Noti_user.findOneAndUpdate(
            { user_id: post.user_id },
            { $push: { detail: { noti_id: noti._id } } },
            { new: true, upsert: true }
        );

        // const noti = await Notification.findOneAndDelete({
        //     user_id: post.user_id,
        //     post_id: req.params.id,
        // });
        // if (noti) {
        //     const follower_Users = await Follow.find({
        //         user_id: req.user._id,
        //     }).select("follower_user_id");

        //     const follower_user_ids = follower_Users
        //         .map((follow) => follow.follower_user_id)
        //         .flat();

        //     for (const user_id of follower_user_ids) {
        //         await Noti_user.findOneAndUpdate(
        //             { user_id: user_id },
        //             { $pull: { detail: { noti_id: noti._id } } },
        //             { new: true, upsert: true }
        //         );
        //     }
        // }

        await Post.deleteOne({ _id: postId });
        return res.status(201).json({
            success: true,
            message: "Xóa bài viết thành công.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 10041,
            message: "Xóa bài viết thất bại : " + error.message,
        });
    }
};

exports.SuperAdminLeaveGroup = async (req, res) => {
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

        if (group.avatar && group.avatar.publicId) {
            await cloudinary.uploader.destroy(group.avatar.publicId);
        }

        const [groupDeleteResult, postsDeleteResult] = await Promise.all([
            Group.findByIdAndDelete(groupId),
            Post.deleteMany({ group_id: groupId }),
        ]);

        return res.status(201).json({
            success: true,
            message: "Super admin rời nhóm thành công.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 10079,
            message: "Rời nhóm thất bại : " + error.message,
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
