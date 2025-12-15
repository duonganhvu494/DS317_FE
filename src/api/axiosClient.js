// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000",
  timeout: 10000,
});

// Attach JSON headers
axiosClient.defaults.headers.common["Accept"] = "application/json";
axiosClient.defaults.headers.post["Content-Type"] = "application/json";

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: chuẩn hoá lỗi UI
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Bạn có thể gắn message UI ở đây (antd notification/toast)
    // console.error("API error:", error?.response || error?.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
