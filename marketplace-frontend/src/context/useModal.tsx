import { useContext } from "react";
import ModalContext from "./ModalContext";

export const useModal = () => {
  const { createModal } = useContext(ModalContext);

  return { createModal };
};
