import { HttpStatusCode } from "../enums/HttpStatusCode.js";
import AppError from "./AppError.js";
import pg from "pg";
const { DatabaseError } = pg;

class DatabaseErrorClass extends AppError {
  constructor(
    description = "Internal server error",
    isOperational = true,
    statusCode = HttpStatusCode.INTERNAL_SERVER
  ) {
    super(description, isOperational, statusCode);
  }

  static fromPgError(pgError: InstanceType<typeof DatabaseError>) {
    switch (pgError.code) {
      case "23505": // unique_violation
        return new DatabaseErrorClass("Resource already exists", true, 409);
      case "23503": // foreign_key_violation
        return new DatabaseErrorClass("Related resource not found", true, 404);
      case "42P01": // undefined_table
        return new DatabaseErrorClass(
          "Database configuration error",
          true,
          500
        );
      default:
        return new DatabaseErrorClass("Database error occurred", true, 500);
    }
  }
}

export default DatabaseErrorClass;
