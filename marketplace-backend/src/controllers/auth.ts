import { createUserParamsSchema } from "../schemas/index.js";
import bcrypt from "bcrypt";
import { Router, Request, Response } from "express";
import { database } from "../config/database.js";

const router = Router();

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

  res.status(201).json({
    message: "User created successfully",
  });
};

// const loginUser: RequestHandler = async (req, res) => {
//   const { email, password } = req.body;

//   // todo: const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
// };

// const logoutUser: RequestHandler = async (req, res) => {
//   const { email, password } = req.body;
// };

router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/logout", logoutUser);

export default router;
