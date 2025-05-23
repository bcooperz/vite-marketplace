import type { NextFunction, Request, Response } from "express";

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
