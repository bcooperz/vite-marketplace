import CreateModalNotInitialised from "@/errors/classes/CreateModalNotInitialised";
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

  setCreateModalFunction(createModalFunction: CreateModalType | null) {
    this.createModalFunction = createModalFunction;
  }

  createModal(Component: ModalComponent<any>) {
    if (!this.createModalFunction) {
      throw new CreateModalNotInitialised();
    }
    return this.createModalFunction(Component);
  }
}

export default ModalRegistry;
