import AxiosInstance from "./axios-instance.svc";

export const API_POST_ENDPOINT = {
  GET: {
    all_posts: "/posts",
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

export const getAllPost = async () => {
  const res = AxiosInstance.get(API_POST_ENDPOINT.GET.all_posts);
  return res;
};

export const getPostById = async (id) => {
  const res = AxiosInstance.get(
    API_POST_ENDPOINT.GET.post_id.replace(":id", id),
  );
  return res;
};

export const createPost = async () => {
  const res = AxiosInstance.post(API_POST_ENDPOINT.POST.create_post);
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

export const updatePost = async (id) => {
  const res = AxiosInstance.put(
    API_POST_ENDPOINT.PUT.update_post.replace(":id", id),
  );
  return res;
};

export const deletePost = async (id) => {
  const res = AxiosInstance.delete(
    API_POST_ENDPOINT.DELETE.delete_post.replace(":id", id),
  );
  return res;
};