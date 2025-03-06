import pg from "pg";
import { NextFunction, Request, Response } from "express";
import {
  createUserParamsSchema,
  getUserByIdParamsSchema,
  updateUserBodySchema,
  updateUserParamsSchema,
} from "./schemas/index.js";
import { InputType } from "./types/api/queries.types.js";

// todo: how can I connect types to what backend returns

// todo: how can controller files be split up - should this be at parent level and passed?
const Pool = pg.Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
  query_timeout: 5000,
});

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
  await pool.query("SELECTD * FROM users3 WHERE id = $1", [id]);
};

export const createUser = async (
  request: Request<unknown, InputType<typeof createUserParamsSchema>>,
  response: Response
) => {
  const { name, email } = createUserParamsSchema.parse(request.body);

  // todo: how can this be abstracted so I'm not creating db calls directly in controller? - see DDD notes
  const results = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email]
  );

  response.status(200).json(results.rows);
};

// todo: test
export const updateUser = (
  request: Request<
    InputType<typeof updateUserParamsSchema>,
    InputType<typeof updateUserBodySchema>
  >,
  response: Response
) => {
  const { id } = updateUserParamsSchema.parse(request.params);
  const { name, email } = updateUserBodySchema.parse(request.body);

  pool.query("UPDATE users SET name=$1, email=$2 WHERE id=$3", [
    name,
    email,
    id,
  ]);
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
