const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
const path = require("path");

const Post = require("../models/Post");
const Post_liked = require("../models/Post_liked");
const Post_stored = require("../models/Post_stored");
const Follow = require("../models/Follow");
const { PostAPIFeatures } = require("../utils/APIFeatures");
const Notification = require("../models/Notification");
const Noti_user = require("../models/Noti_user");
const {
    ErrorMess,
    ErrorCode,
    SuccesMess,
    SuccessCode,
} = require("../constants/error.const");
const { genMessNotAction } = require("../utils/mess.util");

//GET /posts
exports.getAll = async (req, res) => {
    try {
        const userId = req.user._id;
        const { size = 10, page = 1 } = req.query;
        const skip = size * (page - 1);

        const [following_User_Ids] = await Promise.all([
            getFollowingUserIds(userId),
        ]);

        const [posts, totals, likedPosts, storedPosts] = await Promise.all([
            Post.find({
                $or: [
                    { privacy: 2 },
                    {
                        user_id: { $in: following_User_Ids },
                        privacy: 1,
                    },
                    {
                        user_id: req.user._id,
                        privacy: { $in: [0, 1] },
                    },
                ],
            })
                .sort({ create_post_time: -1 })
                .populate("user_id", "first_name last_name avatar.url")
                .select("-post_img.publicId -post_img._id")
                .limit(Number(size))
                .skip(skip),
            Post.countDocuments({
                $or: [
                    { privacy: 2 },
                    {
                        user_id: { $in: following_User_Ids },
                        privacy: 1,
                    },
                    {
                        user_id: req.user._id,
                        privacy: { $in: [0, 1] },
                    },
                ],
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
            posts.map(async (post) => {
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
        res.status(500).json({
            success: false,
            code: 2000,
            message: error.message,
        });
    }
};

//GET /posts/:id
exports.getPost = async (req, res) => {
    try {
        const following_Users = await Follow.find({
            user_id: req.user._id,
        }).select("following_user_id");
        const following_User_Ids = following_Users
            .map((follow) => follow.following_user_id)
            .flat();
        following_User_Ids.push(req.user._id);

        const post = await Post.findById(req.params.id)
            .populate("user_id", "first_name last_name avatar.url")
            .select("-post_img.publicId")
            .lean();

        if (!post) {
            return res.status(404).json({
                success: false,
                code: 2001,
                message: "Không tìm thấy bài viết.",
            });
        }

        // if (!following_User_Ids.some((id) => id.equals(post.user_id._id))) {
        //     return res.status(400).json({
        //         success: false,
        //         code: 2029,
        //         message:
        //             "Không thể xem. Bài viết này của người mà bạn chưa theo dõi.",
        //     });
        // }

        // if (post.privacy == 0 && !post.user_id._id.equals(req.user._id)) {
        //     return res.status(400).json({
        //         success: false,
        //         code: 2030,
        //         message: "Bạn không phù hợp với chế độ xem của bài viết",
        //     });
        // }

        switch (true) {
            case post.privacy == 2:
                break;
            case !following_User_Ids.some((id) => id.equals(post.user_id._id)):
                return res.status(400).json({
                    success: false,
                    code: 2029,
                    message:
                        "Không thể xem. Bài viết này của người mà bạn chưa theo dõi.",
                });
            case post.privacy == 0 && !post.user_id._id.equals(req.user._id):
                return res.status(400).json({
                    success: false,
                    code: 2030,
                    message: "Bạn không phù hợp với chế độ xem của bài viết",
                });
        }

        const check_liked = await Post_liked.findOne({
            post_id: req.params.id,
            user_id: req.user._id,
        });
        const check_stored = await Post_stored.findOne({
            user_id: req.user._id,
            post_id: req.params.id,
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
        res.status(500).json({
            success: false,
            code: 2002,
            message: error.message,
        });
    }
};

const validImageFormats = ["jpg", "jpeg", "png", "mp4"];
const maxFileSize = 10 * 1024 * 1024;
//POST /posts/create
exports.create = async (req, res) => {
    try {
        // if (!req.files.post_img || !req.files.post_img.data) {
        //     return res.status(400).json({
        //         success: false,
        //         code: 2003,
        //         message: "Đăng bài thất bại. Bài đăng phải có ảnh.",
        //     });
        // }

        // const allowedExtensions = validImageFormats.map(
        //     (format) => `.${format}`
        // );
        // const fileExtension = path
        //     .extname(req.files.post_img.name)
        //     .toLowerCase();

        // if (!allowedExtensions.includes(fileExtension)) {
        //     return res.status(400).json({
        //         success: false,
        //         code: 2004,
        //         message:
        //             "Đăng bài thất bại. Định dạng ảnh không hợp lệ. Chỉ chấp nhận .jpg, .jpeg hoặc .png.",
        //     });
        // }

        // const fileSize = req.files.post_img.data.length;
        // if (fileSize > maxFileSize) {
        //     return res.status(400).json({
        //         success: false,
        //         code: 2005,
        //         message:
        //             "Đăng bài thất bại. Kích thước ảnh vượt quá giới hạn cho phép (10MB).",
        //     });
        // }

        // const tempDir = path.join(__dirname, 'temp');
        // await fs.mkdir(tempDir, { recursive: true });
        // const buffer = req.files.post_img.data;
        // const tempFilePath = path.join(tempDir, 'uploadedFile.jpg');
        // await fs.writeFile(tempFilePath, buffer);
        // console.log("req.body.post_img", typeof req.files.post_img);
        // return res.end();

        // const parser = new DatauriParser();
        // const extName = path.extname(req.files.originalname).toString();
        // const file64 = parser.format(extName, req.files.post_img.data);

        // console.log(file64);
        // let _result;

        // cloudinary.uploader
        //     .upload_stream(
        //         { resource_type: "auto", folder: "post_imgs" },
        //         async (error, result) => {
        //             if (error) {
        //                 throw new Error(error.message);
        //             }
        //             // console.log(result);
        //             _result = result;
        //             // return result
        //         }
        //     )
        //     .end(req.files.post_img.data);

        // const result = await new Promise((resolve) => {
        //     cloudinary.uploader
        //         .upload_stream(
        //             { resource_type: "auto", folder: "post_imgs" },
        //             (error, uploadResult) => {
        //                 if(error)
        //                 {
        //                     return res.status(400).json({
        //                         success: false,
        //                         code: 2005,
        //                         message:
        //                             "Lỗi lưu ảnh lên cloundinary.",
        //                     });
        //                 }
        //                 return resolve(uploadResult);
        //             }
        //         )
        //         .end(req.files.post_img.data);
        // });

        // await fs.unlink(tempFilePath);
        // await fs.rmdir(tempDir, { recursive: true });

        // const post_img = {
        //     publicId: result.public_id,
        //     url: result.secure_url,
        // };

        // const currentDate = new Date();
        // const post = await Post.create({
        //     user_id: req.user._id,
        //     ...req.body,
        //     create_post_time: currentDate,
        //     post_img,
        // });

        // const content = req.user.first_name + ' ' + req.user.last_name +' vừa mới đăng bài.';

        // const noti = await Notification.create({
        //     user_id: req.user._id,
        //     noti_content: content,
        //     post_id: post._id,
        //     noti_create_time: currentDate
        // })

        // const follower_Users = await Follow.find({user_id: req.user._id})
        //     .select('follower_user_id');

        // const follower_user_ids = follower_Users
        //     .map(follow => follow.follower_user_id)
        //     .flat();

        // for (const user_id of follower_user_ids) {
        //     await Noti_user.findOneAndUpdate(
        //         { user_id: user_id },
        //         { $push: { 'detail': { noti_id: noti._id } } },
        //         { new: true, upsert: true }
        //     );
        // }

        // res.status(201).json({
        //     success: true,
        //     message: "Đăng bài thành công.",
        //     post,
        // });

        // Nhiều ảnh
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
        const post = await Post.create({
            user_id: req.user._id,
            ...req.body,
            create_post_time: currentDate,
            post_img: postImages,
        });

        const content =
            req.user.first_name +
            " " +
            req.user.last_name +
            " vừa mới đăng bài.";

        const noti = await Notification.create({
            user_id: req.user._id,
            noti_content: content,
            post_id: post._id,
            noti_create_time: currentDate,
        });

        const followerUsers = await Follow.find({
            user_id: req.user._id,
        }).select("follower_user_id");

        const followerUserIds = followerUsers
            .map((follow) => follow.follower_user_id)
            .flat();

        for (const userId of followerUserIds) {
            await Noti_user.findOneAndUpdate(
                { user_id: userId },
                { $push: { detail: { noti_id: noti._id } } },
                { new: true, upsert: true }
            );
        }

        for (const userId of followerUserIds) {
            //   console.log("id" + userId.toString());
            req.app.get("io").emit(userId.toString(), {
                content: content,
                post_id: post._id,
            });
        }

        // req.app.get('io').emit('notis', { content: content, post_id: post._id});

        res.status(201).json({
            success: true,
            message: "Đăng bài thành công.",
            post,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            success: false,
            code: 2006,
            message: "Đăng bài thất bại :" + error.message,
        });
    }
};

//POST /posts/store/:id
exports.store = async (req, res) => {
    try {
        const following_Users = await Follow.find({
            user_id: req.user._id,
        }).select("following_user_id");
        const following_User_Ids = following_Users
            .map((follow) => follow.following_user_id)
            .flat();
        following_User_Ids.push(req.user._id);

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                code: 2007,
                message: "Không tìm thấy bài viết.",
            });
        }

        switch (true) {
            case post.privacy == 2:
                break;
            case !following_User_Ids.some((id) => id.equals(post.user_id._id)):
                return res.status(400).json({
                    success: false,
                    code: 2008,
                    message:
                        "Không thể thao tác. Bài viết này của người mà bạn chưa theo dõi.",
                });
            case post.privacy == 0 && !post.user_id._id.equals(req.user._id):
                return res.status(400).json({
                    success: false,
                    code: 2031,
                    message:
                        "Không thể thao tác. Bạn không phù hợp với chế độ xem của bài viết",
                });
        }

        const stored = await Post_stored.findOneAndUpdate(
            { user_id: req.user._id },
            {},
            { new: true, upsert: true }
        );
        if (stored.post_id.includes(req.params.id)) {
            stored.post_id.pull(req.params.id);
            await stored.save();
            res.status(201).json({
                success: true,
                message: "Bỏ lưu bài viết.",
            });
        } else {
            stored.post_id.push(req.params.id);
            await stored.save();
            res.status(201).json({
                success: true,
                message: "Lưu bài viết thành công.",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 2009,
            message: error.message,
        });
    }
};

//POST /posts/like/:id
const getFollowingUserIds = async (userId) => {
    const followingUsers = await Follow.find({ user_id: userId }).select(
        "following_user_id"
    );
    const followingUserIds = followingUsers
        .map((follow) => follow.following_user_id)
        .flat();
    followingUserIds.push(userId);
    return followingUserIds;
};

exports.like = async (req, res) => {
    try {
        const [followingUserIds, post, liked] = await Promise.all([
            getFollowingUserIds(req.user._id),
            Post.findOne({ _id: req.params.id }),
            Post_liked.findOneAndUpdate(
                { post_id: req.params.id },
                {},
                { new: true, upsert: true }
            ),
        ]);

        if (!post) {
            return res.status(ErrorCode.BAD_REQUEST).json({
                success: false,
                code: ErrorCode.NOT_FOUND_POST,
                message: ErrorMess.NOT_FOUND_POST,
            });
        }

        if (
            post.privacy !== 2 &&
            !followingUserIds.some((id) => id.equals(post.user_id._id))
        ) {
            return res.status(400).json({
                success: false,
                code: ErrorCode.NOT_FOLLOW_USER,
                message: genMessNotAction(ErrorMess.NOT_FOLLOW_USER),
            });
        }

        if (post.privacy === 0 && !post.user_id._id.equals(req.user._id)) {
            return res.status(400).json({
                success: false,
                code: ErrorCode.NOT_VALID_PRIVACY,
                message: genMessNotAction(ErrorMess.NOT_VALID_PRIVACY),
            });
        }

        const userIdSet = new Set(liked.user_id.map((id) => id.toString()));
        if (userIdSet.has(req.user._id.toString())) {
            userIdSet.delete(req.user._id.toString());
            liked.user_id = Array.from(userIdSet);
            await liked.save();

            const noti = await Notification.findOneAndDelete({
                user_id: req.user._id,
                post_id: req.params.id,
            });

            if (noti) {
                await Noti_user.findOneAndUpdate(
                    { user_id: post.user_id },
                    { $pull: { detail: { noti_id: noti._id } } },
                    { new: true, upsert: true }
                );
            }

            const likes = userIdSet.size;

            return res.status(SuccessCode.SUCCESS).json({
                success: true,
                message: SuccesMess.DISLIKE_POST,
                likes,
            });
        } else {
            userIdSet.add(req.user._id.toString());
            liked.user_id = Array.from(userIdSet);
            await liked.save();

            if (!post.user_id.equals(req.user._id)) {
                const currentDate = new Date();
                const content = `${req.user.first_name} ${req.user.last_name} yêu thích bài viết của bạn.`;

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

            const likes = userIdSet.size;

            return res.status(201).json({
                success: true,
                message: SuccesMess.LIKE_POST,
                likes,
            });
        }
    } catch (error) {
        res.status(ErrorCode.SERVER_ERROR).json({
            success: false,
            code: 2012,
            message: error.message,
        });
    }
};

//PUT /posts/:id
exports.update = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                code: 2013,
                message: "Không tìm thấy bài viết.",
            });
        }
        if (!post.user_id.equals(req.user._id)) {
            return res.status(400).json({
                success: false,
                code: 2024,
                message: "Không thể sửa viết của người khác.",
            });
        }
        if (!req.files) {
            return res.status(400).json({
                success: false,
                code: 2014,
                message: "Cập nhật thất bại. Chưa có ảnh.",
            });
        }

        // if (!req.files.post_img || !req.files.post_img.data) {
        //     return res.status(400).json({
        //         success: false,
        //         code: 2014,
        //         message: "Cập nhật thất bại. Chưa có ảnh.",
        //     });
        // }

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

        const description = req.body.post_description;

        await Post.updateOne(
            { _id: req.params.id },
            { $set: { post_description: description, post_img: postImages } }
        );
        return res.status(201).json({
            success: true,
            message: "Cập nhật bài viết thành công.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 2017,
            message: "Cập nhật bài viết thất bại : " + error.message,
        });
    }
};

//DELETE /posts/:id
exports.destroy = async (req, res) => {
    try {
        // một ảnh
        // const post = await Post.findById(req.params.id)
        // if(!post){
        //     return res.status(404).json({
        //         success: false,
        //         code: 2018,
        //         message: 'Không tìm thấy bài viết.',
        //     });
        // }
        // if(!post.user_id.equals(req.user._id))
        // {
        //     return res.status(400).json({
        //         success: false,
        //         code: 2019,
        //         message: 'Không thể xóa bài viết của người khác.',
        //     });
        // }
        // if(post.post_img.publicId){
        //     await cloudinary.uploader.destroy(post.post_img.publicId)
        // }
        // await Post.deleteOne({ _id: req.params.id})

        // nhiều ảnh
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                code: 2018,
                message: "Không tìm thấy bài viết.",
            });
        }
        if (!post.user_id.equals(req.user._id)) {
            return res.status(400).json({
                success: false,
                code: 2019,
                message: "Không thể xóa bài viết của người khác.",
            });
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

        await Post.deleteOne({ _id: req.params.id });

        const noti = await Notification.findOneAndDelete({
            user_id: post.user_id,
            post_id: req.params.id,
        });
        if (noti) {
            const follower_Users = await Follow.find({
                user_id: req.user._id,
            }).select("follower_user_id");

            const follower_user_ids = follower_Users
                .map((follow) => follow.follower_user_id)
                .flat();

            for (const user_id of follower_user_ids) {
                await Noti_user.findOneAndUpdate(
                    { user_id: user_id },
                    { $pull: { detail: { noti_id: noti._id } } },
                    { new: true, upsert: true }
                );
            }
        }

        res.status(200).json({
            success: true,
            message: "Xóa bài viết thành công.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 2020,
            message: "Xóa bài viết thất bại : " + error.message,
        });
    }
};

//PUT /posts/privacy/:id
exports.changePrivacy = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                code: 2025,
                message: "Không tìm thấy bài viết.",
            });
        }
        if (!post.user_id.equals(req.user._id)) {
            return res.status(400).json({
                success: false,
                code: 2026,
                message: "Không thể thao tác trên bài viết của người khác.",
            });
        }
        if (req.body.privacy === undefined || req.body.privacy === null) {
            return res.status(400).json({
                success: false,
                code: 2027,
                message: "Vui lòng chọn chế độ xem",
            });
        }

        post.privacy = req.body.privacy;
        await post.save();

        // await Post.findByIdAndUpdate(
        //     { _id: req.params.id },
        //     { privacy: req.body.privacy},
        //     { new: true, upsert: true }
        // );

        res.status(200).json({
            success: true,
            message: "Thay đổi chế độ xem thành công.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 2028,
            message: "Thay đổi chế độ xem thất bại : " + error.message,
        });
    }
};

//GET /posts/admin
exports.adminGetAll = async (req, res) => {
    try {
        const { size } = req.query;
        const posts = Post.find().select("-post_img.publicId");

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
        res.status(500).json({
            success: false,
            code: 2021,
            message: error.message,
        });
    }
};

//DELETE /posts/admin/:id
exports.adminDestroy = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                code: 2022,
                message: "Không tìm thấy bài viết.",
            });
        }
        if (post.post_img.publicId) {
            await cloudinary.uploader.destroy(post.post_img.publicId);
        }

        const noti = await Notification.findOneAndDelete({
            user_id: post.user_id,
            post_id: req.params.id,
        });
        if (noti) {
            const follower_Users = await Follow.find({
                user_id: req.user._id,
            }).select("follower_user_id");

            const follower_user_ids = follower_Users
                .map((follow) => follow.follower_user_id)
                .flat();

            for (const user_id of follower_user_ids) {
                await Noti_user.findOneAndUpdate(
                    { user_id: user_id },
                    { $pull: { detail: { noti_id: noti._id } } },
                    { new: true, upsert: true }
                );
            }
        }

        await Post.deleteOne({ _id: req.params.id });
        res.status(201).json({
            success: true,
            message: "Xóa bài viết thành công.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 2023,
            message: "Xóa bài viết thất bại : " + error.message,
        });
    }
};

// code: 2032
