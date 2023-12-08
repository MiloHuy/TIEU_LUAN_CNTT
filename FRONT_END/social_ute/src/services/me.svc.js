import AxiosInstance from "./axios-instance.svc";

export const API_ME_ENDPOINT = {
  GET: {
    me_posts: "me/my-posts",
    me_info: "/me/account/info",
  },
  POST: {
    create_post: "/posts/create",
    store_post: "/posts/store/:id",
    like_post: "/posts/like/:id",
  },
  PUT: {
    update_info: "/me/account/info ",
  },
  DELETE: {
    delete_post: "/posts/:id",
  },
};

export const getAllMePosts = () => {
  const res = AxiosInstance.get(API_ME_ENDPOINT.GET.me_posts);
  return res;
};

export const getMeInfo = () => {
  const res = AxiosInstance.get(API_ME_ENDPOINT.GET.me_info);
  return res;
};

export const updateUserInfo = (payload) => {
  const res = AxiosInstance.put(API_ME_ENDPOINT.PUT.update_info, payload);
  return res;
};
