import type { User } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  sessionExpiresAt: string | null;
  loginStore: (user: User, sessionExpiresAt: string) => void;
  updateSessionExpiresAt: (sessionExpiresAt: string) => void;
  logoutStore: () => void;
}

// todo: add automatic logout slightly before session expires
//        - add graceful reauth prompt to user
//        - should this be here or in axios interceptor?

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  sessionExpiresAt: null,
  loginStore: (user: User, sessionExpiresAt: string) =>
    set({ isAuthenticated: true, user, sessionExpiresAt }),
  updateSessionExpiresAt: (sessionExpiresAt: string) => set({ sessionExpiresAt }),
  logoutStore: () => set({ isAuthenticated: false, user: null, sessionExpiresAt: null }),
}));

export default useAuthStore;
