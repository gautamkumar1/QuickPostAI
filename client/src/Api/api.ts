import { RegisterData } from "@/types/type";
import axios from "axios";

export const registerUser = async (data: RegisterData): Promise<any> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/signup`, 
      data
    );
    return response.data;
  } catch (error: any) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
};
