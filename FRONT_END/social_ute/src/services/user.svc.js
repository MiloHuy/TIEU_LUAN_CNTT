import AxiosInstance from "./axios-instance.svc";

export const API_USER_ENDPOINT = {
  GET: {
    user_Info: "/users/info/:id",
    statistics: "/statistics/:id ",
  },

  POST: {
    create_account: "/api/v1/admin/users",
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
