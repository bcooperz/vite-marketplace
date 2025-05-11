import { HttpStatusCode } from "../enums/HttpStatusCode.js";
import AppError from "./AppError.js";

class UnauthorisedError extends AppError {
  constructor(description = "Unauthorised") {
    super(description, true, HttpStatusCode.UNAUTHORISED);
  }
}

export default UnauthorisedError;
