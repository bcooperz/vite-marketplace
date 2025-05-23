import {
  createUserParamsSchema,
  loginUserParamsSchema,
} from "../schemas/index.js";
import bcrypt from "bcrypt";
import { Router, Request, Response } from "express";
import { database } from "../config/database.js";
import NotFoundError from "../errors/classes/NotFoundError.js";

const router = Router();

// todo: add dob and username
// todo: add response types
const registerUser = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password } = createUserParamsSchema.parse(
    req.body
  );
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await database.getPool().query({
    text: "INSERT INTO users (email, password_hash, created_at, updated_at, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
    values: [
      email,
      hashedPassword,
      new Date(),
      new Date(),
      firstName,
      lastName,
    ],
  });

  // Session creation
  req.session.user = {
    id: user.rows[0].id,
    email,
  };

  const sessionExpiresAt = new Date(
    Date.now() + req.session.cookie.maxAge!
  ).toISOString();

  res.status(201).json({
    message: "User created successfully",
    sessionExpiresAt,
  });
};

// todo: is this vulnerable to timing attacks?
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = loginUserParamsSchema.parse(req.body);

  const user = await database
    .getPool()
    .query("SELECT * FROM users WHERE email = $1", [email]);

  const isMatch = await bcrypt.compare(password, user.rows?.[0]?.password_hash);

  if (!user.rows?.[0] || !isMatch) {
    throw new NotFoundError();
  }

  // Session creation
  req.session.user = {
    id: user.rows[0].id,
    email,
  };

  // const sessionExpiresAt = new Date(
  //   Date.now() + req.session.cookie.maxAge!
  // ).toISOString();

  res.status(200).json({
    message: "User logged in successfully",
  });
};

// const logoutUser: RequestHandler = async (req, res) => {
//   const { email, password } = req.body;
// };

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/logout", logoutUser);

export default router;
