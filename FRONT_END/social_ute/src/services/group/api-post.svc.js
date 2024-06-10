import AxiosInstance from "services/axios-instance.svc";
import { API_GROUP_ENDPOINT } from "./router-group.svc";

export const createGroup = async (payload) => {
  const res = AxiosInstance.post(
    API_GROUP_ENDPOINT.POST.createGroup,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
    {
      onUploadProgress: (progressEvent) => {
        console.log(
          "upload progress " +
            Math.round((progressEvent.loaded / progressEvent.total) * 100) +
            "%",
        );
      },
    },
  );
  return res;
};

export const inviteMember = async (url, groupId, userId) => {
  const res = AxiosInstance.post(
    url.replace(":gr_id", groupId).replace(":user_id", userId),
  );
  return res;
};

export const leaveGroup = async (url, groupId) => {
  const res = AxiosInstance.post(url.replace(":gr_id", groupId));
  return res;
};
