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
