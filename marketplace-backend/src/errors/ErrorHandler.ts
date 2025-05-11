import Logger from "./classes/Logger.js";
// todo: anyway to avoid importing from express or is this expected
import { NextFunction, Response } from "express";
import AppError from "./classes/AppError.js";
import { HttpStatusCode } from "./enums/HttpStatusCode.js";
import pg from "pg";
const { DatabaseError } = pg;
import { z, ZodIssue } from "zod";
import { ApiError, ValidationError } from "../types/api/error.types.js";
import APIError from "./classes/APIError.js";
import DatabaseErrorClass from "./classes/DatabaseErrorClass.js";

const formatZodError = (error: ZodIssue): ValidationError => {
  return {
    path: error.path.join("."),
    message: error.message,
  };
};

const formatError = (message: string): ApiError => {
  return {
    status: "error",
    message,
  };
};

const formatValidationError = (errors: ValidationError[]): ApiError => {
  return {
    status: "error",
    message: "Validation error",
    errors,
  };
};

// todo: is this defined correctly, do basic recap for classes
class ErrorHandler {
  logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public async handleError(
    error: Error,
    responseStream: Response<ApiError>
  ): Promise<void> {
    // would normally log stack trace to our own server
    await this.logger.logError(error);

    if (responseStream.headersSent) {
      return;
    }

    if (error instanceof AppError) {
      responseStream.status(error.statusCode).json(formatError(error.message));
    } else if (error instanceof DatabaseError) {
      // Would also log detailed error to monitoring/server - but these should all be known errors handled at the controller/api level
      const dbError = DatabaseErrorClass.fromPgError(error);

      responseStream
        .status(dbError.statusCode)
        .json(formatError(dbError.message));
    } else if (error instanceof z.ZodError) {
      responseStream
        .status(HttpStatusCode.BAD_REQUEST)
        .json(formatValidationError(error.errors.map(formatZodError)));
    } else if (error instanceof SyntaxError && "body" in error) {
      responseStream
        .status(HttpStatusCode.BAD_REQUEST)
        .json(formatError("Invalid JSON"));
    } else {
      responseStream.status(500).json(formatError("Internal Server Error"));
    }
  }
}

export default ErrorHandler;
