import { ERoleNameGroup } from "constants/group/enum";
import {
  catePermiss,
  groupPermission,
} from "constants/group/permission.const";

export const contentDropdownShowMoreGroup = [
  {
    title: "Nội quy của nhóm",
    value: {
      category: catePermiss.SEE,
      method:
        groupPermission[ERoleNameGroup.SUPERADMIN]["groupRegulations"].method,
      endPoint:
        groupPermission[ERoleNameGroup.SUPERADMIN]["groupRegulations"].endPoint,
    },
  },
  {
    title: "Bài viết của bạn",
    value: {
      category: catePermiss.POST,
      method: groupPermission[ERoleNameGroup.SUPERADMIN]["myPosts"].method,
      endPoint: groupPermission[ERoleNameGroup.SUPERADMIN]["myPosts"].endPoint,
    },
  },
  {
    title: "Bài viết chờ duyệt",
    value: {
      category: catePermiss.POST,
      method:
        groupPermission[ERoleNameGroup.MEMBER]["post_wait_approve"]?.method,
      endPoint:
        groupPermission[ERoleNameGroup.MEMBER]["post_wait_approve"]?.endPoint,
    },
  },
  {
    title: "Rời nhóm",
    value: {
      category: catePermiss.LEAVE_GROUP,
      method: groupPermission[ERoleNameGroup.MEMBER]["leaveGroup"]?.method,
      endPoint: groupPermission[ERoleNameGroup.MEMBER]["leaveGroup"]?.endPoint,
    },
  },
];
