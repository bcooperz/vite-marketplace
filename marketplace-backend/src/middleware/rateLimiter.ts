// todo: investigate what these packages do and if they are most suitable
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { Express } from "express";

export const configureSecurityMiddleware = (app: Express) => {
  // Rate limiting
  const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW!),
    max: parseInt(process.env.RATE_LIMIT_MAX!),
  });

  // Apply security headers
  app.use(helmet());

  // Apply rate limiting
  // todo: consider only applying to auth and api routes
  app.use(limiter);
};
