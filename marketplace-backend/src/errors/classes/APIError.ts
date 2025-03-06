import { HttpStatusCode } from "../enums/HttpStatusCode.js";
import AppError from "./AppError.js";

class APIError extends AppError {
  constructor(
    description = "Internal server error",
    isOperational = true,
    statusCode = HttpStatusCode.INTERNAL_SERVER
  ) {
    super(description, isOperational, statusCode);
  }
}

export default APIError;
