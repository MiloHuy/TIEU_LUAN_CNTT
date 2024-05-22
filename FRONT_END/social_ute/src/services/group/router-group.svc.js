import { ERoleNameGroup } from "constants/group/enum";

export const API_GROUP_ENDPOINT = {
  GET: {
    allPostGroup: "/group/post",
    allGroup: "/group/:role",
    rolePermission: "/group/:groupId/get-role-permission",
    infoGroup: "/group/:gr_id/info",
  },
  POST: {
    createGroup: "/group/create",
  },
  PUT: {},
  DELETE: {},
};

const basePermissions = {
  "See.GET.groupInfo": "group_info",
  "See.GET.groupMembers": "members",
  "See.GET.groupRegulation": "group_regulation",

  "Interact.GET.comment": "comment",
  "Interact.POST.likePost": "like_post",
  "Interact.POST.commentPost": "comment_post",
  "Interact.POST.savePost": "save_post",

  "Post.GET.posts": "posts",
  "Post.GET.post": "post",
};

export const API_GROUP_PERMISSION = {
  [ERoleNameGroup.SUPERADMIN]: {
    ...basePermissions,

    "Post.GET.myPosts": "my_posts",
    "Post.POST.post": "post",
    "Post.DELETE.post": "post",

    "Invite.POST.invite": "invite",

    "Manage_member.GET.members": "members",
    "Manage_member.GET.requestJoin": "request_join",

    "Manage_member.POST.acceptRequest": "accept_request",
    "Manage_member.POST.refuseRequest": "refuse_request",

    "Manage_member.PUT.editActive": "edit_active",
    "Manage_member.DELETE.deleteMember": "delete_member",
  },
  [ERoleNameGroup.ADMIN]: {
    ...basePermissions,
  },
  [ERoleNameGroup.GUEST]: {
    ...basePermissions,

    "Request.GET.requestJoin": "request_join",
  },
  [ERoleNameGroup.MEMBER]: {
    ...basePermissions,
  },
};
