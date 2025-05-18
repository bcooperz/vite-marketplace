import { loadEnv, verifyEnv } from "./config/env.js";
import express, { NextFunction, Request, Response, Router } from "express";
import bodyParser from "body-parser";
import Logger from "./errors/classes/Logger.js";
import ErrorHandler from "./errors/ErrorHandler.js";
import ErrorManager from "./errors/ErrorManager.js";
import { HttpStatusCode } from "./errors/enums/HttpStatusCode.js";
import { configureSecurityMiddleware } from "./middleware/rateLimiter.js";
import cors from "cors";
import { createSessionConfig } from "./config/session.js";
import session from "express-session";
import authRoutes from "./controllers/auth.js";
import requireAuth from "./middleware/requireAuth.js";
import usersRoutes from "./controllers/users.js";
import { database } from "./config/database.js";
import https from "https";
import { getSslOptions } from "./util/getSslOptions.js";

const app = express();
const port = process.env.PORT || 3000;
const logger = new Logger();
const errorHandler = new ErrorHandler(logger);
const errorManager = new ErrorManager(logger);

const sslOptions = getSslOptions();

loadEnv();
verifyEnv();

database.initialize();
const pool = database.getPool();

// todo: move to session middleware?
const sessionConfig = createSessionConfig(pool);

const gracefulShutdown = async () => {
  console.log("Shutdown signal received. Cleaning up...");
  await database.close();
  process.exit(0);
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

/* 
  Todo error handling:
    - Handle 
      - Operational errors (runtime problems whose results are expected and should be dealt with in a proper way, e.g. invalid input for an API endpoint)
      - Programmer errors (unexpected bugs in poorly written code)
      - ==database errors
      - ==validation errors
      - ==endpoint not found
      - authentication errors
      - consider how unhandled exceptions should be handled (Express-Async-Errors?)
*/

process.on("uncaughtException", async (error: Error) => {
  console.error("Uncaught Exception:", error);
  errorManager.handleError(error);
  if (!errorManager.isTrustedError(error)) {
    await database.close();
    process.exit(1);
  }
});

//What it catches: Rejected Promises that don’t have a .catch() handler.
//Why it happens: A Promise is rejected but lacks a .catch(), leading to an unhandled rejection.
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  throw reason;
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL!,
    // todo: might need to add for cross domain cookies
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(session(sessionConfig));

// app.use(configureSecurityMiddleware);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, express" });
});

const apiRoutes = Router();

// Auth routes
apiRoutes.use("/auth", authRoutes);

// User routes
apiRoutes.use("/users", requireAuth, usersRoutes);

app.use("/api", apiRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(error, res);
});

app.use((req: Request, res: Response) => {
  res.status(HttpStatusCode.NOT_FOUND).json({
    status: "error",
    message: `Cannot ${req.method} ${req.path}`,
  });
});

const server = https.createServer(sslOptions, app);

server.listen(port, () => {
  console.log("App running on port " + port);
});
