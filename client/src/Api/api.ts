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



axiosInstance.interceptors.request.use(
  async (config) => {
    const token = axiosInstance.defaults.headers.common['Authorization'];
    if (!token) {
      const savedToken = localStorage.getItem("accessToken"); // Load from localStorage
      if (savedToken) {
        config.headers['Authorization'] = `Bearer ${savedToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// *** Fix: Use a Shared Promise to Prevent Multiple Calls
// Add interceptor to handle token expiration
let refreshTokenPromise: Promise<any> | null = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokens()
          .then((data) => {
            refreshTokenPromise = null;
            return data;
          })
          .catch((refreshError) => {
            refreshTokenPromise = null;
            window.location.href = "/";
            return Promise.reject(refreshError);
          });
      }

      try {
        await refreshTokenPromise;
        return axiosInstance(originalRequest); // Retry original request
      } catch (refreshError) {
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
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      const savedToken = localStorage.getItem("accessToken");
      if (savedToken) {
        localStorage.removeItem("accessToken");
      }
      localStorage.setItem("accessToken", response.data.accessToken);
    }
    return response.data;
  } catch (error) {
    throw error;
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
