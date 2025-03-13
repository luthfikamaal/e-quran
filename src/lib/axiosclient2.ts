import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Definisi tipe umum untuk response API
interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

// Konfigurasi default Axios
const apiClient2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  timeout: 10000, // Timeout 10 detik
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan token secara otomatis
apiClient2.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor untuk menangani error secara global
apiClient2.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    }
    return Promise.reject(error);
  }
);

// Helper Fetch API dengan metode generik
export const fetchApi = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient2({
      url: endpoint,
      method,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient2;
