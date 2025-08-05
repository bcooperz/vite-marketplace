import AppError from "./AppError";

class NetworkTimeoutError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "NetworkTimeoutError";
  }
}

export default NetworkTimeoutError;
