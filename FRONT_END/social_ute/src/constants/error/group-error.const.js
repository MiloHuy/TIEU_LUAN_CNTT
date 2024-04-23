const ERROR_CREATE_GROUP = [
  {
    type: "ERR_NAME",
    code: 10026,
    label: "Vui lòng nhập tên nhóm.",
  },
  {
    type: "ERR_FILE_FORMAT",
    code: 10003,
    label: "Định dạng file không hợp lệ.",
  },
  {
    type: "ERR_FILE_MAX_SIZE",
    code: 10004,
    label: "Dung lượng file quá lớn.",
  },
];

export const GroupError = {
  create: ERROR_CREATE_GROUP,
};
