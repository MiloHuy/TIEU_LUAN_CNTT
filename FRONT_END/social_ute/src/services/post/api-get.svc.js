import AxiosInstance from "services/axios-instance.svc";
import { API_POST_ENDPOINT } from "./router-post.svc";

export const getAllPost = async (payload) => {
  const res = AxiosInstance.get(API_POST_ENDPOINT.GET.all_posts, {
    params: payload,
  });
  return res;
};

export const getPostById = async (id) => {
  const res = AxiosInstance.get(
    API_POST_ENDPOINT.GET.post_id.replace(":id", id),
  );
  return res;
};

export const getCommentPost = async (id) => {
  const res = AxiosInstance.get(
    API_POST_ENDPOINT.GET.comment_post.replace(":id", id),
  );
  return res;
};

export const getPostSaved = async () => {
  const res = AxiosInstance.get(API_POST_ENDPOINT.GET.post_saved);
  return res;
};
