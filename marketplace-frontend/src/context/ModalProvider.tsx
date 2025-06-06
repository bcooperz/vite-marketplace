import type { CreateModalType, ModalDetails } from "@/types/modal.types";
import type { ReactElement } from "react";
import { useRef, useState } from "react";
import ModalContext from "./ModalContext";
import ModalTemplate from "@/components/Modal/Modal";

const ModalProvider = ({ children }: { children: ReactElement }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [modalDetails, setModalDetails] = useState<ModalDetails<any>>({
    Component: null,
    Resolve: null,
  });

  // todo: add useCallback back and test
  const closeModal =
    // useCallback(
    <T,>(result: T) => {
      modalDetails?.Resolve?.(result);
      setModalDetails({ Component: null, Resolve: null });
    };
  //   [modalDetails],
  // );

  const createModal: CreateModalType = (Component) => {
    return new Promise((resolve) => {
      dialogRef.current?.showModal();
      setModalDetails({ Component: Component, Resolve: resolve });
    });
  };

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
