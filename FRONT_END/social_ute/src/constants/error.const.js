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
