import ConfigManager from "@/configManager";
import ModalAlreadyOpen from "@/errors/classes/ModalAlreadyOpen";
import useAuthStore from "@/stores/authStore";
import { toast } from "react-toastify";
import ModalRegistry from "./modalRegistry";
import ReAuthModal from "@/components/modals/ReAuthModal";
import CreateModalNotInitialised from "@/errors/classes/CreateModalNotInitialised";
import type { User } from "@/types/user";

const THIRTY_SECONDS = 30 * 1000;
const FIVE_MINUTES = 5 * 60 * 1000;

class AuthService {
  private static instance: AuthService | null = null;
  private reAuthTimeout: NodeJS.Timeout | null = null;
  private logOutTimeout: NodeJS.Timeout | null = null;

  public static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private clearReAuthTimeout() {
    if (this.reAuthTimeout) clearTimeout(this.reAuthTimeout);
    this.reAuthTimeout = null;
  }

  private clearLogOutTimeout() {
    if (this.logOutTimeout) clearTimeout(this.logOutTimeout);
    this.logOutTimeout = null;
  }

  public login({ user, updatedAt }: { user: User; updatedAt: number }) {
    const sessionExpiresAt = updatedAt + ConfigManager.getInstance().getConfig().sessionDuration;
    useAuthStore.getState().loginStore(user, sessionExpiresAt);
    this.updateSessionExpiryTimeouts({ lastUpdate: updatedAt });
  }

  public logout() {
    this.clearLogOutTimeout();
    this.clearReAuthTimeout();
    useAuthStore.getState().logoutStore();
  }

  private setReAuthTimeout({ sessionExpiryTime }: { sessionExpiryTime: number }) {
    this.clearReAuthTimeout();
    this.reAuthTimeout = setTimeout(() => {
      try {
        ModalRegistry.getInstance()
          .createModal(ReAuthModal)
          // todo: review if this approach to error handling is best practice or can be improved
          .catch((error) => {
            if (error instanceof ModalAlreadyOpen) {
              console.error("Modal already open", error);
              // todo: investigate why this is not working
              toast.error("Session expiring soon -- please re-authenticate");
            } else {
              console.error("Error creating modal", error);
            }
          });
      } catch (error) {
        if (error instanceof CreateModalNotInitialised) {
          console.error("Create modal function not set");
        } else {
          console.error("Try block: Error creating modal", error);
        }
      }
    }, sessionExpiryTime - FIVE_MINUTES);
  }

  private setLogOutTimeout({ sessionExpiryTime }: { sessionExpiryTime: number }) {
    this.clearLogOutTimeout();
    this.logOutTimeout = setTimeout(() => {
      this.logout();
    }, sessionExpiryTime - THIRTY_SECONDS);
  }

  public updateSessionExpiryTimeouts({ lastUpdate }: { lastUpdate?: number }) {
    if (!lastUpdate) return;

    const sessionDuration = ConfigManager.getInstance().getConfig().sessionDuration;
    const sessionExpiryTime = lastUpdate + sessionDuration;

    // todo: should timers be limited in how often they can be called?
    this.setLogOutTimeout({ sessionExpiryTime });
    this.setReAuthTimeout({ sessionExpiryTime });
  }
}

export default AuthService;
