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
        groupPermission[ERoleNameGroup.GUEST]["groupRegulations"].method,
      endPoint:
        groupPermission[ERoleNameGroup.GUEST]["groupRegulations"].endPoint,
    },
    action: "groupRegulations",
  },
  {
    title: "Bài viết của bạn",
    value: {
      category: catePermiss.POST,
      method: groupPermission[ERoleNameGroup.SUPERADMIN]["myPosts"].method,
      endPoint: groupPermission[ERoleNameGroup.SUPERADMIN]["myPosts"].endPoint,
    },
    action: "myPosts",
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
    action: "post_wait_approve",
  },
  {
    title: "Rời nhóm",
    value: {
      category: catePermiss.LEAVE_GROUP,
      method: groupPermission[ERoleNameGroup.MEMBER]["leaveGroup"]?.method,
      endPoint: groupPermission[ERoleNameGroup.MEMBER]["leaveGroup"]?.endPoint,
    },
    action: "leaveGroup",
  },
];
