// src/app/apiClient.ts
import axios from "axios";

// Use empty baseURL in dev so MSW can intercept
const baseURL =
  import.meta.env.DEV
    ? ""
    : import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
