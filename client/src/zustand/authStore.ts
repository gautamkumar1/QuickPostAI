import { setAuthHeader } from "@/Api/api";
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
      onRehydrateStorage: () => (state) => {
        // When state is rehydrated from storage
        if (state && state.isAuthenticated && state.user) {
          // Set the auth header with the stored token
          if (state.token) {
            setAuthHeader(state.token);
          }
        }
      },
    }
    ) 
    
  )


export default useAuthStore;
