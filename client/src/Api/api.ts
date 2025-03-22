import { LoginData, RegisterData } from "@/types/type";
import axios from "axios";


const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const axiosInstance = axios.create({
  baseURL: VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const registerUser = async (data: RegisterData): Promise<any> => {
  try {
    const response = await axiosInstance.post("/auth/signup", data);
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

// Add interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        await refreshTokens();
        
        // If refresh successful, retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
// Function to refresh tokens
export const refreshTokens = async () => {
  try {
    const response = await axiosInstance.post('/auth/refreshToken');
    
    // Set the new access token in auth header for future requests
    if (response.data.accessToken) {
      setAuthHeader(response.data.accessToken);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Helper to set the auth header
export const setAuthHeader = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.log(`Error while logout ${error}`);
    throw error;
    
  }
}

export const fetchUserData = async (userId: number | undefined) => {
  try {
    console.log(`Fetching user data for user id ${userId}`);
    const response = await axiosInstance.post('/auth/user',{
      id: userId
    });
    return response.data;
  } catch (error) {
    console.log(`Error while fetching user data ${error}`);
    throw error;
    
  }
};
