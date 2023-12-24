import AxiosInstance from "./axios-instance.svc";

export const API_ADMIN_ENDPOINT = {
  GET: {
    all_accounts: "/users/admin",
    all_posts: "/posts/admin",
  },

  POST: {
    statistics_user: "/statistics/admin",
    create_account: "/api/v1/admin/users",
    follow_unfollow_guest: "/interacts/follow/:id",
  },
  DELETE: {
    delete_post: "/posts/admin/:id",
  },
};

export const getAllAccountUser = (payload) => {
  const res = AxiosInstance.get(API_ADMIN_ENDPOINT.GET.all_accounts, {
    params: payload,
  });
  return res;
};

export const statistics = (id) => {
  const res = AxiosInstance.get(
    API_ADMIN_ENDPOINT.GET.statistics.replace(":id", id),
  );
  return res;
};

export const createAccount = async (payload) => {
  const res = AxiosInstance.post(
    API_ADMIN_ENDPOINT.POST.create_account,
    payload,
  );
  return res;
};

export const getStatisticsUser = async (payload) => {
  const res = AxiosInstance.post(
    API_ADMIN_ENDPOINT.POST.statistics_user,
    payload,
  );
  return res;
};

export const getAllPosts = async (payload) => {
  const res = AxiosInstance.get(API_ADMIN_ENDPOINT.GET.all_posts, {
    params: payload,
  });
  return res;
};

export const deletePostAdmin = async (id) => {
  const res = AxiosInstance.delete(
    API_ADMIN_ENDPOINT.DELETE.delete_post.replace(":id", id),
  );
  return res;
};
