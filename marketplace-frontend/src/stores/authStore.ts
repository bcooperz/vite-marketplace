import ReAuthModal from "@/components/modals/ReAuthModal";
import ModalRegistry from "@/services/modalRegistry";
import type { User } from "@/types/user";
import { create } from "zustand";

const FIVE_SECONDS = 5000;
const FIVE_MINUTES = 5 * 60 * 1000;

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  sessionExpiresAt: string | null;
  loginStore: (user: User, sessionExpiresAt: string) => void;
  updateSessionExpiresAt: ({
    lastUpdate,
    sessionDuration,
  }: {
    lastUpdate: number;
    sessionDuration: number;
  }) => void;
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
  updateSessionExpiresAt: ({
    lastUpdate,
    sessionDuration,
  }: {
    lastUpdate: number;
    sessionDuration: number;
  }) => {
    console.log("updateSessionExpiresAt", lastUpdate, sessionDuration);
    // Create timer to logout user slightly before session expires and prompt user to re-auth
    // const logOutTimeout = setTimeout(() => {
    //   // todo: clear previous timeouts when new refreshed
    //   useAuthStore.getState().logoutStore();
    // }, sessionDuration - FIVE_SECONDS);

    const reAuthTimeout = setTimeout(() => {
      // todo: prompt user to re-auth -- how to create modal?
      // --- see how PT handled this after done
      ModalRegistry.getInstance().createModal(ReAuthModal);
    }, 2000); // todo: update to sessionDuration - FIVE_MINUTES)
  },
  logoutStore: () => set({ isAuthenticated: false, user: null, sessionExpiresAt: null }),
}));

export default useAuthStore;
