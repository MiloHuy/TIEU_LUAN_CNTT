import axios from "axios";
import { getAccessTokenFromCookie } from "utils/auth.utils";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

AxiosInstance.defaults.timeout = 2500;
AxiosInstance.defaults.headers["Concept-type"] = "application/json";
AxiosInstance.defaults.headers["Accept"] = "application/json";
AxiosInstance.defaults.headers["Origin"] = "*";
AxiosInstance.defaults.headers["Access-Control-Allow-Origin"] = "*";

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessTokenFromCookie();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default AxiosInstance;
