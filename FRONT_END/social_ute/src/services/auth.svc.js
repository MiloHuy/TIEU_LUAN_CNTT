import AxiosInstance from "./axios-instance.svc";
export const API_AUTH_ENDPOINT = {
  POST: {
    login: "auth/login",
    register: "auth/register",
    refresh_token: "auth/refresh",
  },
};

//payload: phone and password
export const login = async (payload) => {
  const res = await AxiosInstance.post(API_AUTH_ENDPOINT.POST.login, payload);
  return res;
};
