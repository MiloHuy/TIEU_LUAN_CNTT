import AxiosInstance from "services/axios-instance.svc";
import { API_POST_ENDPOINT } from "./router-post.svc";

export const updatePost = async (id) => {
  const res = AxiosInstance.put(
    API_POST_ENDPOINT.PUT.update_post.replace(":id", id),
  );
  return res;
};

export const updatePrivacyPost = async (id, payload) => {
  const res = AxiosInstance.put(
    API_POST_ENDPOINT.PUT.update_privacy.replace(":id", id),
    payload,
  );
  return res;
};
