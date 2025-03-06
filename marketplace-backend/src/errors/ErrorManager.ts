import AppError from "./classes/AppError.js";
import Logger from "./classes/Logger.js";

class ErrorManager {
  logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public async handleError(error: Error): Promise<void> {
    await this.logger.logError(error);
  }

  public isTrustedError(error: Error) {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }
}

export default ErrorManager;
