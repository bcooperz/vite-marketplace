import AppError from "./AppError";

class NetworkError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

export default NetworkError;
