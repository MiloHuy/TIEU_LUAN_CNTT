const { ERoleNameGroup } = require("./enum");

const catePermiss = {
  SEE: "See",
  INTERACT: "Interact",
  POST: "Post",
  INVITE: "Invite",
  MANAGE_MEMBER: "Manage_member",
  MANAGE_POST: "Manage_post",
  MANAGE_INTERACT: "Manage_interact",
};

const basePermissions = {
  groupInfo: {
    category: catePermiss.SEE,
    method: "GET",
    endPoint: "group_info",
  },
  groupRegulations: {
    category: catePermiss.SEE,
    method: "GET",
    endPoint: "group_regulation",
  },
  allMember: {
    category: catePermiss.SEE,
    method: "GET",
    endPoint: "members",
  },
  comment: {
    category: catePermiss.INTERACT,
    method: "GET",
    endPoint: "comment",
  },
  likePost: {
    category: catePermiss.INTERACT,
    method: "POST",
    endPoint: "like_post",
  },
  commentPost: {
    category: catePermiss.INTERACT,
    method: "POST",
    endPoint: "comment_post",
  },
  savePost: {
    category: catePermiss.INTERACT,
    method: "POST",
    endPoint: "save_post",
  },
  allPosts: {
    category: catePermiss.POST,
    method: "GET",
    endPoint: "posts",
  },
  createPost: {
    category: catePermiss.POST,
    method: "POST",
    endPoint: "post",
  },
};

const superAdminPermissions = {
  myPosts: {
    category: catePermiss.POST,
    method: "GET",
    endPoint: "my_posts",
  },
  deletePost: {
    category: catePermiss.POST,
    method: "DELETE",
    endPoint: "post",
  },
  invite: {
    category: catePermiss.INVITE,
    method: "POST",
    endPoint: "invite",
  },
  allRequestJoin: {
    category: catePermiss.MANAGE_MEMBER,
    method: "GET",
    endPoint: "request_join",
  },
  acceptRequest: {
    category: catePermiss.MANAGE_MEMBER,
    method: "POST",
    endPoint: "accept_request",
  },
  refuseRequest: {
    category: catePermiss.MANAGE_MEMBER,
    method: "POST",
    endPoint: "refuse_request",
  },
  editActive: {
    category: catePermiss.MANAGE_MEMBER,
    method: "PUT",
    endPoint: "edit_active",
  },
  deleteMember: {
    category: catePermiss.MANAGE_MEMBER,
    method: "DELETE",
    endPoint: "delete_member",
  },
};

export const groupPermission = {
  [ERoleNameGroup.GUEST]: { ...basePermissions },
  [ERoleNameGroup.MEMBER]: { ...basePermissions },
  [ERoleNameGroup.ADMIN]: { ...basePermissions },
  [ERoleNameGroup.SUPERADMIN]: { ...basePermissions, ...superAdminPermissions },
};
