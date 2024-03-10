export const ERROR_SYSTEM = "Lỗi hệ thống vui lòng chờ giây phút";

export const ERROR_LOGIN = [
  {
    type: "ERR_PHONE",
    code: 1002,
    label: "Vui lòng kiểm tra lại số điện thoại.",
  },
  {
    type: "ERR_PASSWORD",
    code: 1003,
    label: "Vui lòng kiểm tra lại mật khẩu.",
  },
  {
    type: "ERR_IS_ACTIVE",
    code: 1008,
    label: "Tài khoản đã bị vô hiệu hóa.",
  },
];

export const ERROR_REGISTER = [
  {
    type: "ERR_ID_OR_PHONE",
    code: 1000,
    label: "Số điện thoại hoặc mã số sinh viên đã tồn tại.",
  },
];

export const ERROR_FORGOT_PASSWORD = [
  {
    type: "ERR_PHONE",
    code: 1002,
    label: "Vui lòng kiểm tra lại số điện thoại.",
  },
  {
    type: "ERR_MAIL",
    code: 1004,
    label: "Vui lòng kiểm tra lại email.",
  },
  {
    type: "ERR_PHONE_MAIL",
    code: 1009,
    label: "Không tìm thấy người dùng vui lòng kiểm tra lại thông tin.",
  },
];

export const ERROR_VERIFY_OTP = [
  {
    type: "ERR_OTP",
    code: 1011,
    label: "OTP không đúng vui lòng nhập lại mã.",
  },
  {
    type: "ERR_OTP",
    code: 1012,
    label: "OTP hết hạn. Vui lòng gmail để lấy lại mã",
  },
];

export const ERR_CREATE_POST = [
  {
    type: "ERR_TYPE_FILE",
    code: 2004,
    label: "Định dạng file không hợp lệ.",
  },
  {
    type: "ERR_FILE_EMPTY",
    code: 2006,
    label: "Vui lòng hãy chọn ảnh.",
  },
];

export const ERR_CHANGE_AVATAR = [
  {
    type: "ERR_TYPE_FILE",
    code: 3013,
    label: "Định dạng file không hợp lệ.",
  },
  {
    type: "ERR_FILE_EMPTY",
    code: 3015,
    label: "Vui lòng hãy chọn ảnh.",
  },
];

export const ERR_POST = [
  {
    type: "ERR_COMMNENT",
    code: 8001,
    label: "Không thể thao tác bài của người chưa theo dõi.",
  },
];
