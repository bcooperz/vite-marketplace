import type { CreateModalType, ModalComponent } from "@/types/modal.types";

class ModalRegistry {
  private static instance: ModalRegistry;
  private createModalFunction: CreateModalType | null = null;

  static getInstance() {
    if (!ModalRegistry.instance) {
      ModalRegistry.instance = new ModalRegistry();
    }
    return ModalRegistry.instance;
  }

  setCreateModalFunction(createModalFunction: CreateModalType) {
    this.createModalFunction = createModalFunction;
  }

  createModal(Component: ModalComponent<any>) {
    if (!this.createModalFunction) {
      throw new Error("Create modal function not set");
    }
    return this.createModalFunction(Component);
  }
}

export default ModalRegistry;
