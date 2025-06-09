import type { ModalComponent } from "@/types/modal.types";

// todo: add api call to re-authenticate
const ReAuthModal: ModalComponent<boolean> = ({ handleOk }) => {
  return (
    <div>
      <h2>Session Expired</h2>
      <p>Please re-authenticate to continue</p>
      <button onClick={() => handleOk(true)}>Re-authenticate</button>
    </div>
  );
};

export default ReAuthModal;
