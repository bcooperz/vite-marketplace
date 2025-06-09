import { NextFunction, Request, Response } from "express";

const SESSION_UPDATE_INTERVAL = 1000 * 60 * 5;

// Middleware to update session on each request
const updateSessionActivity = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.user) {
    const now = Date.now();
    const lastUpdate = req.session.user.lastUpdate || 0;
    const timeSinceLastUpdate = now - lastUpdate;

    if (timeSinceLastUpdate >= SESSION_UPDATE_INTERVAL) {
      // This modification triggers the rolling behavior
      req.session.user = {
        ...req.session.user,
        lastActivity: new Date().toISOString(),
        lastUpdate: now,
      };
    }
  }
  next();
};

export default updateSessionActivity;
