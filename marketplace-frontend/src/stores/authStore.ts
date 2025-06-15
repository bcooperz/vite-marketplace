import type { User } from "@/types/user";
import { create } from "zustand";

/*
 todo: 
  - implement functionality for when this logs user out
*/

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  sessionExpiresAt: number | null;
  loginStore: (user: User, sessionExpiresAt: number) => void;
  updateSessionExpiresAt: ({
    lastUpdate,
    sessionDuration,
  }: {
    lastUpdate: number;
    sessionDuration: number;
  }) => void;
  logoutStore: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  sessionExpiresAt: null,
  loginStore: (user: User, sessionExpiresAt: number) =>
    set({ isAuthenticated: true, user, sessionExpiresAt }),
  updateSessionExpiresAt: ({
    lastUpdate,
    sessionDuration,
  }: {
    lastUpdate: number;
    sessionDuration: number;
  }) => {
    const sessionExpiryTime = lastUpdate + sessionDuration;
    set({ sessionExpiresAt: sessionExpiryTime });
  },
  logoutStore: () => {
    set({ isAuthenticated: false, user: null, sessionExpiresAt: null });
  },
}));

export default useAuthStore;
