import { HttpStatusCode } from "../enums/HttpStatusCode.js";

class AppError extends Error {
  public readonly isOperational: boolean;
  public readonly statusCode: HttpStatusCode;

  constructor(
    description: string,
    isOperational: boolean,
    statusCode: HttpStatusCode
  ) {
    super(description);
    // Fixes quirk with prototype of Error subclasses to be incorrect
    Object.setPrototypeOf(this, new.target.prototype);
    this.isOperational = isOperational;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

export default AppError;
