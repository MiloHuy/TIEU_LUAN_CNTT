import AxiosInstance from "./axios-instance.svc";
export const API_AUTH_ENDPOINT = {
  GET: {
    userInfo: "auth/userinfo",
  },
  POST: {
    login: "auth/login",
    register: "auth/register",
    refresh_token: "/auth/refresh-token",
    logout: "auth/logout",
    forgot_password: "auth/forgot-password",
    reset_password: "auth/reset-password/:token",
    verifyOtp: "auth/verify-otp",
  },
};

//payload: phone and password
export const login = async (payload) => {
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

export const forgotPassword = async (payload) => {
  const res = await AxiosInstance.post(
    API_AUTH_ENDPOINT.POST.forgot_password,
    payload,
  );
  return res;
};

export const verifyOtp = async (payload) => {
  const res = await AxiosInstance.post(
    API_AUTH_ENDPOINT.POST.verify_otp,
    payload,
  );
  return res;
};

export const logout = async () => {
  const res = await AxiosInstance.post(API_AUTH_ENDPOINT.POST.logout);
  return res;
};

export const refreshToken = async () => {
  const res = await AxiosInstance.post(API_AUTH_ENDPOINT.POST.refresh_token);
  return res;
};
