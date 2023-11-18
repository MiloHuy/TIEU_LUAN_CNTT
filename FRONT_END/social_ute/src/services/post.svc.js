import AxiosInstance from "./axios-instance.svc";

export const API_POST_ENDPOINT = {
  GET: {
    all_posts: "post/all",
  },
};

export const getAllPost = async () => {
  const res = AxiosInstance.get(API_POST_ENDPOINT.GET.all_posts);
  return res;
};
