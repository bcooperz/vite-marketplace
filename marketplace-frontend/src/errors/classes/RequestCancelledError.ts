import AppError from "./AppError";

class RequestCancelledError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "RequestCancelledError";
  }
}

export default RequestCancelledError;
