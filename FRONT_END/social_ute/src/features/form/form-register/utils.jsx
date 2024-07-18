import { RoleConst } from "constants/role.const";
import { BriefcaseBusiness, User } from "lucide-react";

export const genLabelFormRegister = () => {
  return {
    first_name: "Họ",
    last_name: "Tên",
    email: "Gmail",
    phone_number: "Số điện thoại",
    id: "Mã số ID",
    pass_word: "Mật khẩu",
    department: "Khoa/Phòng ban",
    role: "Vai trò",
  };
};

export const genOptionsPrivacyPost = () => {
  return [
    {
      value: RoleConst.STUDENT,
      label: "Giảng viên/Sinh viên",
      icon: <User size={20} strokeWidth={1.25} />,
    },
    {
      value: RoleConst.STAFF,
      label: "Nhân viên",
      icon: <BriefcaseBusiness size={20} strokeWidth={1.25} />,
    },
  ];
};
