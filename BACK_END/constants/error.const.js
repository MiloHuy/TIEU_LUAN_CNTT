const ErrorMess = {
  NOT_FOUND_POST: "Không tìm thấy bài viết",
  NOT_FOLLOW_USER: "Bạn chưa theo dõi người dùng này",
  NOT_VALID_PRIVACY: "Chế độ riêng tư không hợp lệ",
};

const ErrorCode = {
  BAD_REQUEST: 404,
  SERVER_ERROR: 500,

  NOT_FOUND_POST: 2010,
  NOT_FOLLOW_USER: 2011,
  NOT_VALID_PRIVACY: 2032,
};

const SuccesMess = {
  LIKE_POST: "Thích bài viết thành công",
  DISLIKE_POST: "Bỏ thích bài viết thành công",
};

const SuccessCode = {
  SUCCESS: 200,
  LIKE_POST: 2000,
  DISLIKE_POST: 2001,
};

module.exports = { ErrorCode, ErrorMess, SuccesMess, SuccessCode };
