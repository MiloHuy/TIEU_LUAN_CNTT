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
    upload_avatar: "/me/avatar",
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

export const uploadImageAvatar = (payload) => {
  const res = AxiosInstance.post(
    API_ME_ENDPOINT.POST.upload_avatar,
    payload,
    {
      headers: {
        "Content-Type": `multipart/form-data`,
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
