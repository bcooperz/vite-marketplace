import dotenv from "dotenv";
import path from "path";

const loadEnv = () => {
  // Load environment variables
  dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
  });
};

const verifyEnv = () => {
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
    "COOKIE_DOMAIN",
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

export { loadEnv, verifyEnv };
