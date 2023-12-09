import AxiosInstance from "./axios-instance.svc";

export const API_USER_ENDPOINT = {
  GET: {
    user_Info: "/users/info/:id",
    statistics: "/statistics/:id ",
    list_posts_guest: "/users/posts/:id ",
    get_search_user: "/users/search",
  },

  POST: {
    create_account: "/api/v1/admin/users",
    follow_unfollow_guest: "/interacts/follow/:id",
    add_cancel_friend: "/interacts/addfriend/:id",
    accept_friend: "/interacts/accept/:id",
    refuse_friend: "/interacts/refuse/:id ",
  },
};

export const getUserInfo = (id) => {
  const res = AxiosInstance.get(
    API_USER_ENDPOINT.GET.user_Info.replace(":id", id),
  );
  return res;
};

export const statistics = (id) => {
  const res = AxiosInstance.get(
    API_USER_ENDPOINT.GET.statistics.replace(":id", id),
  );
  return res;
};

export const createAccount = async (payload) => {
  const res = AxiosInstance.post(
    API_USER_ENDPOINT.POST.create_account,
    payload,
  );
  return res;
};

export const followGuest = async (id) => {
  const res = AxiosInstance.post(
    API_USER_ENDPOINT.POST.follow_unfollow_guest.replace(":id", id),
  );
  return res;
};

export const AddCancelFriend = async (id) => {
  const res = AxiosInstance.post(
    API_USER_ENDPOINT.POST.add_cancel_friend.replace(":id", id),
  );
  return res;
};

export const AcceptFriend = async (id) => {
  const res = AxiosInstance.post(
    API_USER_ENDPOINT.POST.accept_friend.replace(":id", id),
  );
  return res;
};

export const RefuseFriend = async (id) => {
  const res = AxiosInstance.post(
    API_USER_ENDPOINT.POST.refuse_friend.replace(":id", id),
  );
  return res;
};

export const getAllPostsGuest = (id) => {
  const res = AxiosInstance.get(
    API_USER_ENDPOINT.GET.list_posts_guest.replace(":id", id),
  );
  return res;
};

export const getUserSearch = (payload) => {
  const res = AxiosInstance.get(API_USER_ENDPOINT.GET.get_search_user, {
    params: payload,
  });
  return res;
};
