import AxiosInstance from "services/axios-instance.svc";

export const deleteMemberGroup = async (url,groupId, memberId) => {
  const res = AxiosInstance.delete(
    url.replace(":gr_id", groupId).replace(":user_id", memberId)
  );
  return res;
}

export const deletePostGroup = async (url, groupId, postId) => {
  const res = AxiosInstance.delete(url.replace(":gr_id", groupId).replace(":post_id", postId));
  return res;
}

export const deleteReportPostGroup = async (url, groupId, reportId) => {
  const res = AxiosInstance.delete(url.replace(":gr_id", groupId).replace(":report_id", reportId));
  return res;
}

export const deletePostManage = async (url, groupId, postId) => {
  const res = AxiosInstance.delete(url.replace(":gr_id", groupId).replace(":post_id", postId));
  return res;
}

export const deleteMemberManage = async (url, groupId, memberId) => {
  const res = AxiosInstance.delete(url.replace(":gr_id", groupId).replace(":user_id", memberId));
  return res;
}
