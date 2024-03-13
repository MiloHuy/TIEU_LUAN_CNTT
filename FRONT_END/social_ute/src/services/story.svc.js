import AxiosInstance from "./axios-instance.svc";

export const API_STORY_ENDPOINT = {
  GET: {
    all_story: "/stories",
  },
  POST: {
    create_story: "/stories/create",
  },
};

export const getAllStory = async () => {
  const res = AxiosInstance.get(API_STORY_ENDPOINT.GET.all_story);
  return res;
};
