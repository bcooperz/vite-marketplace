import AppError from "./AppError";

// todo: is there a better name for this?
class GenericServerError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "GenericServerError";
  }
}

export default GenericServerError;
