import AxiosInstance from "./axios-instance.svc";

export const API_STORY_ENDPOINT = {
  GET: {
    all_story: "story/all",
  },
};

export const getAllPost = async () => {
  const res = AxiosInstance.get(API_STORY_ENDPOINT.GET.all_posts);
  return res;
};
