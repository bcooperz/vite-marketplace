import AppError from "./AppError";

class ConflictError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
}

export default ConflictError;
