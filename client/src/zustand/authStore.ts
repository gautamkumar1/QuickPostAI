import { UserData } from "@/types/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// ✅ Extend AuthState to include functions
interface AuthState {
  isAuthenticated: boolean;
  isTwitterLoggedIn: boolean;
  user?: UserData;
  token?: string;
  setAuth: (user: UserData, token: string) => void; // ✅ Add this
  setTwitterLoggedIn: (status: boolean) => void;
  logout: () => void; // ✅ Add this
}

// ✅ Define Zustand store with actions
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isTwitterLoggedIn: false,
      user: undefined,
      token: undefined,

      // ✅ Function to set authentication
      setAuth: (user, token) => set({ isAuthenticated: true, user, token }),
      // ✅ Function to update Twitter login status
      setTwitterLoggedIn: (status) => set({ isTwitterLoggedIn: status }),

      // ✅ Function to log out
      logout: () => set({ isAuthenticated: false, user: undefined, token: undefined,  }),
    }),
    {
      name: "auth-storage", // Name for localStorage
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        isTwitterLoggedIn: state.isTwitterLoggedIn,
        token: state.token,
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;
