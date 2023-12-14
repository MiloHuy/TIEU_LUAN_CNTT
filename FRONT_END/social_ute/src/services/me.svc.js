import AxiosInstance from "./axios-instance.svc";

export const API_ME_ENDPOINT = {
  GET: {
    me_posts: "me/posts",
    me_info: "/me/account/info",
    me_friends: "/me/friends",
    me_requests_friends: "/me/friend-request",
  },
  POST: {
    create_post: "/posts/create",
    store_post: "/posts/store/:id",
    like_post: "/posts/like/:id",
  },
  PUT: {
    update_info: "/me/account/info ",
    change_password: "/me/account/password",
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

export const getRequestFriend = () => {
  const res = AxiosInstance.get(API_ME_ENDPOINT.GET.me_requests_friends);
  return res;
};

export const updateUserInfo = (payload) => {
  const res = AxiosInstance.put(API_ME_ENDPOINT.PUT.update_info, payload);
  return res;
};

export const changePassWord = (payload) => {
  const res = AxiosInstance.put(API_ME_ENDPOINT.PUT.change_password, payload);
  return res;
};

export const getListFriends = () => {
  const res = AxiosInstance.get(API_ME_ENDPOINT.GET.me_friends);
  return res;
};
