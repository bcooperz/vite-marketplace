import { NextFunction, Request, Response } from "express";

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

    if (timeSinceLastUpdate >= Number(process.env.SESSION_UPDATE_INTERVAL)) {
      // This modification triggers the rolling behavior of sending an updated cookie
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
