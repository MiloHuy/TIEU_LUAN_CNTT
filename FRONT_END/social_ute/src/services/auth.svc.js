import AxiosInstance from "./axios-instance.svc";
export const API_AUTH_ENDPOINT = {
  GET: {
    userInfo: "auth/userinfo",
  },
  POST: {
    login: "auth/login",
    register: "auth/register",
    refresh_token: "auth/refresh",
    logout: "auth/logout",
  },
};

//payload: phone and password
export const login = async (payload) => {
  console.log("payload", payload);
  const res = await AxiosInstance.post(API_AUTH_ENDPOINT.POST.login, payload);
  return res.data;
};

export const register = async (payload) => {
  const res = await AxiosInstance.post(
    API_AUTH_ENDPOINT.POST.register,
    payload,
  );
  return res;
};
