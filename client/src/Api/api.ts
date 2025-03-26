import { LoginData, RegisterData } from "@/types/type";
import useAuthStore from "@/zustand/authStore";
import axios from "axios";


// const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const VITE_BACKEND_URL = import.meta.env.VITE_NODE_ENV === "production"
? import.meta.env.VITE_PROD_URL
: import.meta.env.VITE_DEV_URL;
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

// ✅ Attach Authorization header dynamically from Zustand
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Token Refresh Logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { accessToken } = await refreshTokens();
        const user = useAuthStore.getState().user;
        if (user) {
          useAuthStore.getState().setAuth(user, accessToken);
        }
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        await logoutUser();
        useAuthStore.getState().logout(); // Logout on refresh failure
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ✅ Token Refresh API
const refreshTokens = async () => {
  try {
    const response = await axiosInstance.post("/auth/refreshToken",{},{ withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await axiosInstance.post("/auth/logout"); // Call server-side logout API
  } catch (error) {
    console.error("Logout API call failed:", error);
  } finally {
    useAuthStore.getState().logout();           // Clear Zustand state
    localStorage.removeItem("auth-storage");   // Clear session storage// Redirect to login or home
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

/*
-----> AI TWEET GENERATION API <-----
*/

export const tweetGenerate = async (url:string) =>{
  try {
    const response = await axiosInstance.post('/tweetGenerate',{
      url
    })
    return response.data;
  } catch (error) {
    console.log(`Error while generating tweet ${error}`);
    throw error;
    
  }
}