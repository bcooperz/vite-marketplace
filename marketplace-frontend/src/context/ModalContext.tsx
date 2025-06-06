import { createContext } from "react";
import type { CreateModalType } from "../types/modal.types";

// todo: test what happens if you use a component in a parent component without exporting, what error does vite give?
//        --- read https://github.com/vitejs/vite-plugin-react-swc#consistent-components-exports ?

const ModalContext = createContext<{
  createModal: CreateModalType;
}>({
  createModal: () => {
    throw new Error("ModalContext not provided");
  },
});

export default ModalContext;
