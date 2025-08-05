import { HttpStatusCode } from "../enums/HttpStatusCode.js";
import AppError from "./AppError.js";

class BadRequestError extends AppError {
  constructor(
    description = "Bad request",
    isOperational = true,
    statusCode = HttpStatusCode.BAD_REQUEST
  ) {
    super(description, isOperational, statusCode);
  }
}

export default BadRequestError;
