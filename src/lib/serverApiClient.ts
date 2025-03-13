import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Definisi tipe umum untuk response API
interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

// Konfigurasi Axios untuk server
const serverApiClient = axios.create({
  baseURL: process.env.API_V2_URL || "https://api.example.com",
  timeout: 10000, // Timeout 10 detik
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper Fetch API dengan metode generik
export const fetchServerApi = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await serverApiClient({
      url: endpoint,
      method,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error("Server API Error:", error);
    throw error;
  }
};

export default serverApiClient;
