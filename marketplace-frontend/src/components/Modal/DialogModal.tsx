import type { ReactElement, Ref } from "react";
import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const DialogModal = ({
  ref,
  Component,
}: {
  ref: Ref<{ getResult: () => Promise<boolean>; open: () => void; close: () => void }>;
  Component: ({ resolve }: { resolve: (result: boolean) => void }) => ReactElement | null;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalPromiseResolver = useRef<{ resolver: (result: boolean) => void }>(null);

  useImperativeHandle(ref, () => ({
    getResult: () => {
      return new Promise<boolean>((resolve) => {
        modalPromiseResolver.current = { resolver: resolve };
        dialogRef.current?.showModal();
      });
    },
    open: () => {
      dialogRef.current?.showModal();
    },
    close: () => {
      dialogRef.current?.close();
      modalPromiseResolver.current?.resolver?.(false);
    },
  }));

  const resolveFunction = (result: boolean) => {
    modalPromiseResolver.current?.resolver?.(result);
    dialogRef.current?.close();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      style={{ padding: "1rem", zIndex: 100 }}
      onClose={() => {
        if (modalPromiseResolver.current) {
          modalPromiseResolver.current.resolver(false);
        }
      }}
    >
      <button
        onClick={() => {
          resolveFunction(false);
        }}
        style={{ position: "absolute", top: 0, right: 0 }}
      >
        X - Close
      </button>
      <h2>Dialog header</h2>
      <Component resolve={resolveFunction} />
    </dialog>,
    document.getElementById("modalContainer")!,
  );
};

export default DialogModal;
