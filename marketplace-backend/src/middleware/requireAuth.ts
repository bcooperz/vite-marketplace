import { NextFunction, Request, Response } from "express";
import UnauthorisedError from "../errors/classes/UnauthorisedError.js";

// Middleware to check for session
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    // todo: test
    throw new UnauthorisedError();
  }
  next();
};

export default requireAuth;
