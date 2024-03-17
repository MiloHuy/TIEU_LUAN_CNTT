import AxiosInstance from "services/axios-instance.svc";
import { API_POST_ENDPOINT } from "./router-post.svc";

export const deletePost = async (id) => {
  const res = AxiosInstance.delete(
    API_POST_ENDPOINT.DELETE.delete_post.replace(":id", id),
  );
  return res;
};
