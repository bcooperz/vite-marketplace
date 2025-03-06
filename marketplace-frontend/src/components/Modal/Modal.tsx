import { ModalResult } from "@/types/modal.types";
import { MouseEventHandler, ReactElement } from "react";

// consider create modal which handles accessibility concerns that <dialog> covers - see MDN

const Backdrop = ({
  children,
  onClick,
}: {
  children?: ReactElement;
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0,0,0,0.2)",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const Content = <T,>({
  children,
  closeModal,
}: {
  children: ReactElement | null;
  closeModal: (Result: T | null) => void;
}) => {
  return (
    <div
      style={{
        width: "50vw",
        minWidth: "30rem",
        maxWidth: "60rem",
        height: "80vh",
        position: "absolute",
        backgroundColor: "white",
        border: "1px solid #99000000",
        boxShadow: "rgba(0,0,0,0.3) 0 0 8px 0",
        borderRadius: "1rem",
        padding: "1rem",
      }}
    >
      <span style={{ position: "absolute", right: "1rem" }}>
        {/* todo: should this have an aria attribute */}
        <button onClick={() => closeModal(null)}>X</button>
      </span>
      {children}
    </div>
  );
};

const ModalTemplate = <T,>({
  closeModal,
  children,
  ref,
}: {
  closeModal: (result: ModalResult<T>) => void;
  children: ReactElement | null;
  ref: React.RefObject<HTMLDialogElement | null>;
}) => {
  return (
    <dialog
      style={{
        padding: "1rem",
        width: "50vw",
        minWidth: "30rem",
        maxWidth: "60rem",
        height: "80vh",
        zIndex: 100,
      }}
      onClose={() => {
        closeModal(null);
      }}
      ref={ref}
    >
      <span style={{ position: "absolute", right: "1rem" }}>
        {/* todo: should this have an aria attribute */}
        <button onClick={() => ref.current?.close()}>X</button>
      </span>
      {children}
      {/* <Backdrop onClick={() => closeModal(null)} />
      <Content closeModal={closeModal}>{children}</Content> */}
    </dialog>
  );
};

export default ModalTemplate;
