const { ERoleNameGroup } = require("./enum");

export const catePermiss = {
  SEE: "See",
  INTERACT: "Interact",
  POST: "Post",
  INVITE: "Invite",
  MANAGE_ADMIN: "Manage_admin",
  MANAGE_MEMBER: "Manage_member",
  MANAGE_POST: "Manage_post",
  MANAGE_INTERACT: "Manage_interact",
  MANAGE_REGULATION: "Manage_regulation",
  LEAVE_GROUP: "Leave_Group",
  EDIT_GROUP: "Edit",
};

const createPermission = (category, method, endPoint) => ({
  category,
  method,
  endPoint,
});

const basePermissions = {
  groupInfo: createPermission(catePermiss.SEE, "GET", "group_info"),
  groupRegulations: createPermission(
    catePermiss.SEE,
    "GET",
    "group_regulation",
  ),
  allMember: createPermission(catePermiss.SEE, "GET", "members"),
  comment: createPermission(catePermiss.INTERACT, "GET", "comment"),
  likePost: createPermission(catePermiss.INTERACT, "POST", "like_post"),
  commentPost: createPermission(catePermiss.INTERACT, "POST", "comment_post"),
  savePost: createPermission(catePermiss.INTERACT, "POST", "save_post"),
  allPosts: createPermission(catePermiss.POST, "GET", "posts"),
  createPost: createPermission(catePermiss.POST, "POST", "post"),
  detailPost: createPermission(catePermiss.POST, "GET", "post"),
};

const superAdminPermissions = {
  manageGroup: {
    manageMember: {
      allMember: createPermission(catePermiss.MANAGE_MEMBER, "GET", "members"),
      allRequestJoin: createPermission(
        catePermiss.MANAGE_MEMBER,
        "GET",
        "request_join",
      ),
      acceptRequest: createPermission(
        catePermiss.MANAGE_MEMBER,
        "POST",
        "accept_request",
      ),
      refuseRequest: createPermission(
        catePermiss.MANAGE_MEMBER,
        "POST",
        "refuse_request",
      ),
      editActive: createPermission(
        catePermiss.MANAGE_MEMBER,
        "PUT",
        "edit_active",
      ),
      deleteMember: createPermission(
        catePermiss.MANAGE_MEMBER,
        "DELETE",
        "delete_member",
      ),
    },
    managePost: {
      allPosts: createPermission(catePermiss.MANAGE_POST, "GET", "posts"),
      deletePost: createPermission(catePermiss.MANAGE_POST, "DELETE", "post"),
      approvePost: createPermission(
        catePermiss.MANAGE_POST,
        "POST",
        "approve_post",
      ),
      reportPosts: createPermission(catePermiss.MANAGE_POST, "GET", "report"),
      allPostWaitApprove: createPermission(
        catePermiss.MANAGE_POST,
        "GET",
        "queue_post",
      ),
    },
    manageInteract: {
      statisticMember: createPermission(
        catePermiss.MANAGE_INTERACT,
        "GET",
        "statistic_member",
      ),
      statisticPost: createPermission(
        catePermiss.MANAGE_INTERACT,
        "GET",
        "statistic_post",
      ),
      statisticComment: createPermission(
        catePermiss.MANAGE_INTERACT,
        "GET",
        "statistic_cmt",
      ),
      statisticLike: createPermission(
        catePermiss.MANAGE_INTERACT,
        "GET",
        "statistic_like",
      ),
    },
  },
  myPosts: createPermission(catePermiss.POST, "GET", "my_posts"),
  deletePost: createPermission(catePermiss.POST, "DELETE", "post"),
  invite: createPermission(catePermiss.INVITE, "POST", "invite"),
};

export const methodManageGroup = (listMethod) =>
  Object.values(listMethod).map((permission) => permission.method);

export const endPointsManageGroup = (listEndpoint) =>
  Object.values(listEndpoint).map((permission) => permission.endPoint);

export const groupPermission = {
  [ERoleNameGroup.GUEST]: { ...basePermissions },
  [ERoleNameGroup.MEMBER]: {
    ...basePermissions,
    allPostsWaitApprove: createPermission(
      catePermiss.POST,
      "GET",
      "posts_wait_approve",
    ),
    leaveGroup: createPermission(
      catePermiss.LEAVE_GROUP,
      "POST",
      "leave_group",
    ),
  },
  [ERoleNameGroup.ADMIN]: {
    ...basePermissions,
    leaveGroup: createPermission(
      catePermiss.LEAVE_GROUP,
      "POST",
      "leave_group",
    ),
  },
  [ERoleNameGroup.SUPERADMIN]: {
    ...basePermissions,
    ...superAdminPermissions,
    manageAdmin: {
      allAdmin: createPermission(catePermiss.MANAGE_ADMIN, "GET", "admin"),
      searchAdmin: createPermission(catePermiss.MANAGE_ADMIN, "GET", "search"),
      editActive: createPermission(
        catePermiss.MANAGE_ADMIN,
        "PUT",
        "edit_active",
      ),
      editPermission: createPermission(
        catePermiss.MANAGE_ADMIN,
        "PUT",
        "edit_permission",
      ),
      addAdmin: createPermission(catePermiss.MANAGE_ADMIN, "POST", "add_admin"),
      deleteAdmin: createPermission(
        catePermiss.MANAGE_ADMIN,
        "DELETE",
        "delete_admin",
      ),
    },
    leaveGroup: createPermission(
      catePermiss.LEAVE_GROUP,
      "POST",
      "leave_group",
    ),
  },
};
