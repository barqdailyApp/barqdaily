import axios from "axios";
import { getCookie } from "cookies-next";

import { HOST_API } from "@/config-global";
// ----------------------------------------------------------------------

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: HOST_API || "",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("access_token");
    const lang = getCookie("lang") || "ar";

    // Attach headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Accept-Language"] = lang;
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status || 500;
    const message = getErrorMessage(error);
    // Handle errors
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ message, status });
  }
);
export default axiosInstance;
// ----------------------------------------------------------------------

export const getErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof Error) {
    // eslint-disable-next-line prefer-destructuring
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }
  return message;
};
