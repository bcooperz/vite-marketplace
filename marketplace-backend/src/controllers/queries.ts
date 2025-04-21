import { NextFunction, Request, Response } from "express";
import {
  createUserParamsSchema,
  getUserByIdParamsSchema,
  updateUserBodySchema,
  updateUserParamsSchema,
} from "../schemas/index.js";
import { InputType } from "../types/api/queries.types.js";
import { HttpStatusCode } from "../errors/enums/HttpStatusCode.js";
import AppError from "../errors/classes/AppError.js";
import NotFoundError from "../errors/classes/NotFoundError.js";
import { pool } from "../config/database.js";

// todo: how can I connect types to what backend returns

// todo: how can controller files be split up - should this be at parent level and passed?

pool.on("error", (error) => {
  console.error("Unexpected database error:", error);
  process.exit(1); // Exit the process if the database connection is lost
});

export const displayHome = () => {};

export const getUsers = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // next() automatically if this fails
  const results = await pool.query({
    text: "SELECT * FROM users ORDER BY id ASC",
  });

  console.log(results.rows);
  response.status(200).json(results.rows);
};

export const getUserById = async (
  request: Request<InputType<typeof getUserByIdParamsSchema>>,
  response: Response,
  next: NextFunction
) => {
  const { id } = getUserByIdParamsSchema.parse(request.params);
  const results = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  const user = results.rows?.[0];
  if (!user) {
    throw new NotFoundError();
  }
  response.status(HttpStatusCode.OK).json(user);
};

export const createUser = async (
  request: Request<unknown, InputType<typeof createUserParamsSchema>>,
  response: Response
) => {
  // const { username, email } = createUserParamsSchema.parse(request.body);
  // const results = await pool.query(
  //   "INSERT INTO users (name, email) VALUES ($1, $2)",
  //   [name, email]
  // );
  // response.status(HttpStatusCode.OK).json(results.rows);
};

export const updateUser = async (
  request: Request<
    InputType<typeof updateUserParamsSchema>,
    InputType<typeof updateUserBodySchema>
  >,
  response: Response
) => {
  const { id } = updateUserParamsSchema.parse(request.params);
  const { name, email } = updateUserBodySchema.parse(request.body);

  await pool.query("UPDATE users SET name=$1, email=$2 WHERE id=$3", [
    name,
    email,
    id,
  ]);

  response.status(HttpStatusCode.OK).send();
};

// todo
export const deleteUser = (request: Request, response: Response) => {};

export default {
  displayHome,
  getUsers,
  createUser,
  getUserById,
  updateUser,
};
