import type { CreateModalType, ModalDetails } from "@/types/modal.types";
import type { ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import ModalContext from "./ModalContext";
import ModalTemplate from "@/components/Modal/Modal";
import ModalRegistry from "@/services/modalRegistry";
import ModalAlreadyOpen from "@/errors/classes/ModalAlreadyOpen";

const ModalProvider = ({ children }: { children: ReactElement }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [modalDetails, setModalDetails] = useState<ModalDetails<any>>({
    Component: null,
    Resolve: null,
  });

  const closeModal = useCallback(
    <T,>(result: T) => {
      console.log("closeModal", result);
      if (modalDetails.Resolve) {
        if (dialogRef.current?.open) {
          dialogRef.current?.close();
        }
        modalDetails.Resolve(result);
        setModalDetails({ Component: null, Resolve: null });
      }
    },
    [modalDetails],
  );

  const createModal: CreateModalType = useCallback((Component) => {
    // todo: consider what axios should do if modal is already open -- show a toast?
    return new Promise((resolve, reject) => {
      if (dialogRef.current?.open) {
        reject(new ModalAlreadyOpen());
        return;
      }
      dialogRef.current?.showModal();
      setModalDetails({ Component: Component, Resolve: resolve });
    });
  }, []);

  useEffect(() => {
    ModalRegistry.getInstance().setCreateModalFunction(createModal);
  }, [createModal]);

  const { Component } = modalDetails;

  useEffect(() => {
    const dialog = dialogRef.current;

    return () => {
      console.log("useEffect cleanup");
      if (dialog?.open) {
        // todo: consider -- THIS SHOULD END UP CALLING THE CLOSE MODAL FUNCTION
        dialog.close();
        ModalRegistry.getInstance().setCreateModalFunction(null);
      }
    };
  }, []);

  return (
    <ModalContext.Provider value={{ createModal }}>
      <>
        <ModalTemplate closeModal={closeModal} ref={dialogRef}>
          {Component && <Component handleOk={closeModal} />}
        </ModalTemplate>
        {children}
      </>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
