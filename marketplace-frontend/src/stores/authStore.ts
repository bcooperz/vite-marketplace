import type { User } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  sessionExpiresAt: string | null;
  loginStore: (user: User, sessionExpiresAt: string) => void;
  logoutStore: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  sessionExpiresAt: null,
  loginStore: (user: User, sessionExpiresAt: string) =>
    set({ isAuthenticated: true, user, sessionExpiresAt }),
  logoutStore: () => set({ isAuthenticated: false, user: null, sessionExpiresAt: null }),
}));

export default useAuthStore;
