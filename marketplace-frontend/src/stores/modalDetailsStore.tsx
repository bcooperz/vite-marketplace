import type { ModalDetails } from "@/types/modal.types";
import { create } from "zustand";

interface ModalDetailsStore {
  modalDetails: ModalDetails<any>;
  setModalDetails: (modalDetails: ModalDetails<any>) => void;
}

const useModalDetailsStore = create<ModalDetailsStore>((set) => ({
  modalDetails: {
    Component: null,
    Resolve: null,
  },
  setModalDetails: (modalDetails) => set({ modalDetails }),
}));

export default useModalDetailsStore;
