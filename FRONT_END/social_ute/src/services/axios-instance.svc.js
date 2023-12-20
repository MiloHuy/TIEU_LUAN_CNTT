import axios from "axios";
import { SSOCOOKIES } from "constants/app.const";
import Cookies from "js-cookie";
import qs from "qs";
import { getAccessTokenFromCookie } from "utils/auth.utils";
import { refreshToken } from "./auth.svc";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  paramsSerializer: (params) => {
    return qs.stringify(params);
  },
});

AxiosInstance.defaults.headers.post["Content-Type"] = "application/json";
AxiosInstance.defaults.headers["Accept"] = "application/json";
AxiosInstance.defaults.headers["Origin"] = "*";
AxiosInstance.defaults.headers["Content-Type"] = "application/json";

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessTokenFromCookie();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await refreshToken();

        const { token } = response.data;

        Cookies.set(SSOCOOKIES.access, token, { expires: 1 });
        originalRequest.headers.Authorization = `Bearer ${token}`;

        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        Cookies.remove(SSOCOOKIES.access, { path: "/" });
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
  // async (res) => {
  //   console.log("response:" + res);
  //   const { data, config } = res;
  //   const { code } = data;

  //   if (allErrorCode.includes(code)) {
  //     const token_fail_code = [
  //       ErrorCodeApi.JwtCodeRefreshToken,
  //       ErrorCodeApi.JwtCodeRefreshTokenNotExistCookie,
  //       ErrorCodeApi.JwtCodeRefreshTokenBeUsed,
  //       ErrorCodeApi.JwtCodeRefreshTokenNotExistSystem,
  //     ];

  //     switch (true) {
  //       case token_fail_code.include(code): {
  //         return handleRefreshTokenFail(config);
  //       }
  //       default:
  //         return handleErrorMessageToken(res);
  //     }
  //   }
  //   return res;
  // },
);
export default AxiosInstance;
