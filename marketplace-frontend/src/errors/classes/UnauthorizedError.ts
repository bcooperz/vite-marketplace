import AppError from "./AppError";

class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export default UnauthorizedError;
