import { LoginData, RegisterData } from "@/types/type";
import axios from "axios";
import Cookies from "js-cookie";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const axiosInstance = axios.create({
  baseURL: VITE_BACKEND_URL,
  withCredentials: true,
});
export const registerUser = async (data: RegisterData): Promise<any> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/signup`, 
      data
    );
    return response.data;
  } catch (error: any) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (data : LoginData): Promise<any> => {
  try {
    const response = await axiosInstance.post("/auth/signin",data);
    return response.data;
  } catch (error) {
    console.log(`Error while login ${error}`);
    throw error;
    
  }
}
// Before any request is sent, this interceptor checks if there's an access token in the cookies.
// If there is, it adds it to the Authorization header.
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// If the server responds with a 401 status code, this interceptor will try to refresh the access token.
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call Refresh Token API
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/refreshToken`, {
          withCredentials: true,
        });
        return axiosInstance(originalRequest); // Retry the failed request
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
