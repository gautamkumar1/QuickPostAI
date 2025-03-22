import { UserData } from "@/types/type";
import { create, } from "zustand";
import { persist } from "zustand/middleware";

// Define the store state and actions type
interface AuthState {
  isAuthenticated: boolean;
  user?:UserData
  token?:string
}

// Create the store
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user:undefined,
      token:undefined,
    }),
    {
      name: 'auth-storage', // Name for localStorage
      partialize:
        (state) => ({ isAuthenticated: state.isAuthenticated, token: state.token, user: state.user }), // Only persist the token and isAuthenticated
    }
    ) 
    
  )


export default useAuthStore;
