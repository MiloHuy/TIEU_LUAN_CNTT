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
