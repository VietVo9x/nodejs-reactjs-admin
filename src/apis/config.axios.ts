import axios from "axios";
import { api } from ".";

const axiosInstance = axios.create({
  baseURL: api,
  timeout: 3000,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    config.headers["authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !error.config.url.includes("verify-token")
    ) {
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
