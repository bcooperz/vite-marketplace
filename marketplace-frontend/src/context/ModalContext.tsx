import ModalTemplate from "@/components/Modal/Modal";
import type { ReactElement } from "react";
import { createContext, useRef, useState } from "react";
import type { CreateModalType, ModalDetails } from "../types/modal.types";

// todo: test what happens if you use a component in a parent component without exporting, what error does vite give?
//        --- read https://github.com/vitejs/vite-plugin-react-swc#consistent-components-exports ?

const ModalContext = createContext<{
  createModal: CreateModalType;
}>({
  createModal: () => {
    throw new Error("ModalContext not provided");
  },
});

export const ModalProvider = ({ children }: { children: ReactElement }) => {
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

export default ModalContext;
