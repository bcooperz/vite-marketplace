import AppError from "./AppError";

class ServerValidationError extends AppError {
  constructor(
    description = "Server validation error",
    public errors: { path: string; message: string }[],
  ) {
    super(description);
    this.name = "ServerValidationError";
    this.errors = errors;
  }
}

export default ServerValidationError;
