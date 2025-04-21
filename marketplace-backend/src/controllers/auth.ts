import { createUserParamsSchema } from "../schemas/index.js";
import bcrypt from "bcrypt";
import { Router, Request, Response } from "express";
import { pool } from "../config/database.js";

// const router = Router();

// TODO: likely erroring because session isn't setup by this point

const registerUser = async (req: Request, res: Response) => {
  const { address, dob, email, firstName, lastName, password, username } =
    createUserParamsSchema.parse(req.body);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await pool.query({
    text: "INSERT INTO users (username, password, first_name, last_name, email, address, dob) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
    values: [
      username,
      hashedPassword,
      firstName,
      lastName,
      email,
      address,
      dob,
    ],
  });

  // todo: test what happens if email already exists

  console.log(user.rows[0]);

  //todo: test what happens if this fails

  // Session creation
  req.session.user = {
    id: user.rows[0].id,
    email,
  };

  // req.session.save((err) => {
  //   if (err) {
  //     next(err);
  //   }
  // });
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

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/logout", logoutUser);

const router = Router();

export default router;
