import AxiosInstance from "services/axios-instance.svc";
import { API_POST_ENDPOINT } from "./router-post.svc";

export const createPost = async (payload) => {
  const res = AxiosInstance.post(
    API_POST_ENDPOINT.POST.create_post,
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

export const storePost = async (id) => {
  const res = AxiosInstance.post(
    API_POST_ENDPOINT.POST.store_post.replace(":id", id),
  );
  return res;
};

export const likePost = async (id) => {
  const res = AxiosInstance.post(
    API_POST_ENDPOINT.POST.like_post.replace(":id", id),
  );
  return res;
};

export const postComment = async (id, payload) => {
  const res = AxiosInstance.post(
    API_POST_ENDPOINT.POST.create_comment.replace(":id", id),
    payload,
  );
  return res;
};

export const likeComment = async (id) => {
  const res = AxiosInstance.post(
    API_POST_ENDPOINT.POST.like_comment.replace(":id", id),
  );
  return res;
};

export const createPostGroup = async (url, groupId, payload) => {
  const res = AxiosInstance.post(url.replace(":gr_id", groupId), payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
