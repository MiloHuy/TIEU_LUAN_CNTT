import axios from "axios";
import { getAccessTokenFromCookie } from "utils/auth.utils";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

AxiosInstance.defaults.headers.post["Content-Type"] = "application/json";
AxiosInstance.defaults.headers["Accept"] = "application/json";
AxiosInstance.defaults.headers["Origin"] = "*";
AxiosInstance.defaults.headers["Content-Type"] = "application/json";

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessTokenFromCookie();

    console.log("Token: " + token);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default AxiosInstance;
