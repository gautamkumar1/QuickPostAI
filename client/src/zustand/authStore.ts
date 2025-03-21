import { create, } from "zustand";
import { persist } from "zustand/middleware";

// Define the store state and actions type
interface AuthState {
  isAuthenticated: boolean;
}

// Create the store
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
    }),
    {
      name: "auth-storage", // Local storage key
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated}) // Specify what to persist
    }
  )
);

export default useAuthStore;
