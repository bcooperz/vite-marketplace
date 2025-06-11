class AppError extends Error {
  constructor(description: string) {
    super(description);
    this.name = "AppError";
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export default AppError;
