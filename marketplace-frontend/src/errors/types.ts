import type ConflictError from "./classes/ConflictError";
import type NotFoundError from "./classes/NotFoundError";
import type UnauthorizedError from "./classes/UnauthorizedError";
import type NetworkTimeoutError from "./classes/NetworkTimeoutError";
import type RequestCancelledError from "./classes/RequestCancelledError";
import type NetworkError from "./classes/NetworkError";
import type ServerValidationError from "./classes/ServerValidationError";
import type ForbiddenError from "./classes/ForbiddenError";
import type GenericServerError from "./classes/GenericServerError";

export type NetworkErrors =
  | ConflictError
  | NotFoundError
  | UnauthorizedError
  | NetworkTimeoutError
  | RequestCancelledError
  | NetworkError
  | ForbiddenError
  | GenericServerError;

export type ApiErrors = NetworkErrors | ServerValidationError;
