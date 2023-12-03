import axios from "axios";
import { api } from ".";

const axiosInstance = axios.create({
  baseURL: api,
  timeout: 3000,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
