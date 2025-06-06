import {
  createUserParamsSchema,
  loginUserParamsSchema,
} from "../schemas/index.js";
import bcrypt from "bcrypt";
import { Router, Request, Response } from "express";
import { database } from "../config/database.js";
import NotFoundError from "../errors/classes/NotFoundError.js";
import { HttpStatusCode } from "../errors/enums/HttpStatusCode.js";

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

  const userDetails = user.rows[0];

  // Session creation
  req.session.user = {
    id: userDetails.id,
    email: userDetails.email,
    lastUpdate: Date.now(),
    lastActivity: new Date().toISOString(),
  };

  res.status(HttpStatusCode.CREATED).json({
    user: {
      email: userDetails.email,
      firstName: userDetails.first_name,
      lastName: userDetails.last_name,
      createdAt: userDetails.created_at,
      updatedAt: userDetails.updated_at,
    },
  });
};

// todo: is this vulnerable to timing attacks?
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = loginUserParamsSchema.parse(req.body);

  const user = await database
    .getPool()
    .query("SELECT * FROM users WHERE email = $1", [email]);

  const userDetails = user.rows[0];

  if (!userDetails) {
    throw new NotFoundError();
  }

  const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
  if (!isMatch) {
    throw new NotFoundError();
  }

  // Session creation
  req.session.user = {
    id: userDetails.id,
    email: userDetails.email,
    lastActivity: new Date().toISOString(),
    lastUpdate: Date.now(),
  };

  res.status(HttpStatusCode.OK).json({
    user: {
      email: userDetails.email,
      firstName: userDetails.first_name,
      lastName: userDetails.last_name,
      createdAt: userDetails.created_at,
      updatedAt: userDetails.updated_at,
    },
  });
};

// const logoutUser: RequestHandler = async (req, res) => {
//   const { email, password } = req.body;
// };

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/logout", logoutUser);

export default router;
