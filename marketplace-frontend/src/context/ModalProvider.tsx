import type { CreateModalType, ModalDetails } from "@/types/modal.types";
import type { ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import ModalContext from "./ModalContext";
import ModalTemplate from "@/components/Modal/Modal";
import ModalRegistry from "@/services/modalRegistry";
// import useModalDetailsStore from "@/stores/modalDetailsStore";

const ModalProvider = ({ children }: { children: ReactElement }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [modalDetails, setModalDetails] = useState<ModalDetails<any>>({
    Component: null,
    Resolve: null,
  });

  // const { modalDetails, setModalDetails } = useModalDetailsStore(dialogRef);

  // todo: add useCallback back and test
  const closeModal =
    // useCallback(
    <T,>(result: T) => {
      modalDetails?.Resolve?.(result);
      setModalDetails({ Component: null, Resolve: null });
    };
  //   [modalDetails],
  // );

  const createModal: CreateModalType = useCallback((Component) => {
    return new Promise((resolve) => {
      dialogRef.current?.showModal();
      setModalDetails({ Component: Component, Resolve: resolve });
    });
  }, []);

  useEffect(() => {
    ModalRegistry.getInstance().setCreateModalFunction(createModal);
  }, [createModal]);

  const { Component } = modalDetails;

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
