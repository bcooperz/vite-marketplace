import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import db from "./queries.js";
import Logger from "./errors/classes/Logger.js";
import ErrorHandler from "./errors/ErrorHandler.js";
import ErrorManager from "./errors/ErrorManager.js";
import { ApiError } from "./types/api/error.types.js";

const app = express();
const port = 3000;
const logger = new Logger();
const errorHandler = new ErrorHandler(logger);
const errorManager = new ErrorManager(logger);

/* 
  Todo error handling:
    - Handle 
      - Operational errors (runtime problems whose results are expected and should be dealt with in a proper way, e.g. invalid input for an API endpoint)
      - Programmer errors (unexpected bugs in poorly written code)
      - ==database errors
      - ==validation errors
      - endpoint not found
      - authentication errors

*/

process.on("uncaughtException", (error: Error) => {
  errorManager.handleError(error);
  if (!errorManager.isTrustedError(error)) {
    process.exit(1);
  }
});

//What it catches: Rejected Promises that don’t have a .catch() handler.
//Why it happens: A Promise is rejected but lacks a .catch(), leading to an unhandled rejection.
process.on("unhandledRejection", (reason, promise) => {
  console.log("reason", reason);
  console.log("reason", promise);
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, express" });
});

// todo: separate into another file
app.get("/users", db.getUsers);
app.get("/user/:id", db.getUserById);
app.post("/user", db.createUser);
// todo: test
app.patch("/user/:id", db.updateUser);

app.use(
  (error: Error, req: Request, res: Response<ApiError>, next: NextFunction) => {
    errorHandler.handleError(error, res);
  }
);

app.listen(port, () => {
  console.log("App running on port " + port);
});
