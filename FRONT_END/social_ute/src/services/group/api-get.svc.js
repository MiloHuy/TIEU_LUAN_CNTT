import AxiosInstance from "services/axios-instance.svc";
import { API_GROUP_ENDPOINT } from "./router-group.svc";

export const getAllGroup = async (role) => {
  const res = AxiosInstance.get(
    API_GROUP_ENDPOINT.GET.allGroup.replace(":role", role),
  );
  return res;
};

export const getRolePermission = async (groupId) => {
  const res = AxiosInstance.get(
    API_GROUP_ENDPOINT.GET.rolePermission.replace(":groupId", groupId),
  );
  return res;
};

export const getAllPostGroup = async (url, groupId, params) => {
  const res = AxiosInstance.get(url.replace(":gr_id", groupId), {
    params: params,
  });
  return res;
};

export const getInfoGroup = async (url, gr_id) => {
  const res = AxiosInstance.get(url.replace(":gr_id", gr_id));
  return res;
};

export const getAllMember = async (url, groupId) => {
  const res = AxiosInstance.get(url.replace(":gr_id", groupId));
  return res;
};

export const getAllRegulations = async (url, groupId) => {
  const res = AxiosInstance.get(url.replace(":gr_id", groupId));
  return res;
};

export const getPostDetailGroup = async (url, postId, groupId) => {
  const res = AxiosInstance.get(
    url.replace(":post_id", postId).replace(":gr_id", groupId),
  );
  return res;
};

export const getAllCommentPostGroup = async (url, postId, groupId) => {
  const res = AxiosInstance.get(
    url.replace(":post_id", postId).replace(":gr_id", groupId),
  );
  return res;
};

export const getAllMembersGroup = async (url, groupId) => {
  const res = AxiosInstance.get(url.replace(":gr_id", groupId));
  return res;
}

export const acceptRequestJoinGroup = async (url, groupId, userId) => {
  const res = AxiosInstance.post(url.replace(":gr_id", groupId).replace(":user_id", userId));
  return res;
}

export const refuseRequestJoinGroup = async (url, groupId, userId) => {
  const res = AxiosInstance.post(url.replace(":gr_id", groupId).replace(":user_id", userId));
  return res;
}

export const allPostsManageGroup = async (url, groupId) => {
  const res = AxiosInstance.get(url.replace(":gr_id", groupId));
  return res;
}

export const approvePostGroup = async (url, groupId, postId) => {
  const res = AxiosInstance.post(url.replace(":gr_id", groupId).replace(":post_id", postId));
  return res;
}

export const allPostsReportManageGroup = async (url, groupId) => {
  const res = AxiosInstance.get(url.replace(":gr_id", groupId));
  return res;
}

export const getStatisticMemberGroup = async (url, groupId) => {
  const res = AxiosInstance.get(url.replace(":gr_id", groupId));
  return res;
}

export const getStatisticPostGroup = async (url, groupId) => {
  const res = AxiosInstance.get(url.replace(":gr_id", groupId));
  return res;
}

export const getStatisticCommentGroup = async (url, groupId) => {
  const res = AxiosInstance.get(url.replace(":gr_id", groupId));
  return res;
}

export const getStatisticLikeGroup = async (url, groupId) => {
  const res = AxiosInstance.get(url.replace(":gr_id", groupId));
  return res;
}

export const deletePostGroup = async (url, groupId, postId) => {
  const res = AxiosInstance.delete(url.replace(":gr_id", groupId).replace(":post_id", postId));
  return res;
}
