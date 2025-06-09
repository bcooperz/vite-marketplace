import { useContext } from "react";
import ModalContext from "../context/ModalContext";

export const useModal = () => {
  const { createModal } = useContext(ModalContext);

  return { createModal };
};
