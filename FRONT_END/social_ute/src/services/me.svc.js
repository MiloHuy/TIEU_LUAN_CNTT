import AxiosInstance from "./axios-instance.svc";

export const API_ME_ENDPOINT = {
  GET: {
    me_posts: "me/my-posts",
    post_id: "/posts/:id",
  },
  POST: {
    create_post: "/posts/create",
    store_post: "/posts/store/:id",
    like_post: "/posts/like/:id",
  },
  PUT: {
    update_post: "/posts/:id",
  },
  DELETE: {
    delete_post: "/posts/:id",
  },
};

export const getAllMePosts = () => {
  const res = AxiosInstance.get(API_ME_ENDPOINT.GET.me_posts);
  return res;
};
