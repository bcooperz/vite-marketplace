// src/config/env.ts
import dotenv from "dotenv";
import path from "path";

// Load environment variables immediately
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

// Export a function to verify environment variables
export const verifyEnv = () => {
  const requiredVars = [
    "PORT",
    "NODE_ENV",
    "POSTGRES_USER",
    "POSTGRES_PASSWORD",
    "POSTGRES_DB",
    "POSTGRES_HOST",
    "POSTGRES_PORT",
    "POSTGRES_QUERY_TIMEOUT",
    "SESSION_SECRET",
    "SESSION_DURATION",
    "COOKIE_SECURE",
    "COOKIE_SAME_SITE",
    "RATE_LIMIT_WINDOW",
    "RATE_LIMIT_MAX",
    "FRONTEND_URL",
    "JWT_SECRET",
    "JWT_EXPIRES_IN",
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
};
