import { HttpStatusCode } from "../enums/HttpStatusCode.js";
import AppError from "./AppError.js";

class NotFoundError extends AppError {
  constructor(description = "Resource not found") {
    super(description, true, HttpStatusCode.NOT_FOUND);
  }
}

export default NotFoundError;
