import AppError from "./AppError";

class ModalAlreadyOpen extends AppError {
  constructor(description = "Modal already open") {
    super(description);
    this.name = "ModalAlreadyOpen";
  }
}

export default ModalAlreadyOpen;
