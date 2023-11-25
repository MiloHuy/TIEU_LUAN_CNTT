import axios from "axios";
import { getAccessTokenFromCookie } from "utils/auth.utils";

const DoanInstance = axios.create({
  baseURL: "https://final-project-it-project.vercel.app",
  withCredentials: true,
});

DoanInstance.interceptors.request.use(
  (config) => {
    const token = getAccessTokenFromCookie();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default DoanInstance;
