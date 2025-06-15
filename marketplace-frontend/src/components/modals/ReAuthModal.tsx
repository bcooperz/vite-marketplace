import authenticationApi from "@/api/authenticationApiModules";
import AuthService from "@/services/authService";
import type { ModalResult } from "@/types/modal.types";

interface ReAuthModalProps {
  handleOk: (result: ModalResult<boolean>) => void;
}

// todo: add api call to re-authenticate
const ReAuthModal = ({ handleOk }: ReAuthModalProps) => {
  return (
    <div>
      <h2>Session expiring soon</h2>
      <p>Please re-authenticate to continue</p>
      <button
        onClick={async () => {
          try {
            // todo: would this always fail if user is not authenticated?
            //       in which case I wouldn't need a log out timer in addition to the re-auth timer?
            const response = await authenticationApi.reAuthenticate();
            console.log("response", response);
            handleOk(true);
          } catch (error) {
            // todo: test this
            // Failed to re-authenticate so log out
            console.error("Error re-authenticating", error);
            AuthService.getInstance().logout();
            handleOk(false);
          }
        }}
      >
        Re-authenticate
      </button>
    </div>
  );
};

export default ReAuthModal;
