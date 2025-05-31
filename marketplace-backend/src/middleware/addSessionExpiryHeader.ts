import type { NextFunction, Request, Response } from "express";

// todo: consider better to use shared maxAge config value for frontend and backend or to get from single api call
const addSessionExpiryHeader = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.user) {
    const sessionExpiresAt = new Date(
      Date.now() + req.session.cookie.maxAge!
    ).toISOString();
    res.setHeader("X-Session-Expires-At", sessionExpiresAt);
  }
  next();
};

export default addSessionExpiryHeader;
