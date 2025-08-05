import {
  createUserParamsSchema,
  loginUserParamsSchema,
} from "@marketplace-types";
import bcrypt from "bcrypt";
import { Router, Request, Response } from "express";
import { database } from "../config/database.js";
import NotFoundError from "../errors/classes/NotFoundError.js";
import BadRequestError from "../errors/classes/BadRequestError.js";
import { HttpStatusCode } from "../errors/enums/HttpStatusCode.js";

const router = Router();

// todo: add response types
const registerUser = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password, dob, confirmPassword } =
    createUserParamsSchema.parse(req.body);

  if (password !== confirmPassword) {
    // todo: should be a server validation error?
    throw new BadRequestError("Passwords do not match");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await database.getPool().query({
    text: "INSERT INTO users (email, password_hash, created_at, updated_at, first_name, last_name, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
    values: [
      email,
      hashedPassword,
      new Date(),
      new Date(),
      firstName,
      lastName,
      dob,
    ],
  });

  const userDetails = user.rows[0];

  const lastUpdate = Date.now();
  const lastActivity = new Date().toISOString();

  // Session creation
  req.session.user = {
    id: userDetails.id,
    email: email,
    lastUpdate: lastUpdate,
    lastActivity: lastActivity,
  };

  res.status(HttpStatusCode.CREATED).json({
    user: {
      email: email,
      firstName: firstName,
      lastName: lastName,
    },
    updatedAt: lastUpdate,
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

  const lastUpdate = new Date().getTime();

  // Session creation
  req.session.user = {
    id: userDetails.id,
    email: userDetails.email,
    lastActivity: new Date().toISOString(),
    lastUpdate: lastUpdate,
  };

  res.status(HttpStatusCode.OK).json({
    user: {
      email: userDetails.email,
      firstName: userDetails.first_name,
      lastName: userDetails.last_name,
    },
    updatedAt: lastUpdate,
  });
};

const reAuthenticate = async (req: Request, res: Response) => {
  const user = req.session.user;

  if (!user) {
    throw new NotFoundError();
  }

  const lastUpdate = new Date().getTime();

  res.status(HttpStatusCode.OK).json({
    user: {
      email: user.email,
    },
    updatedAt: lastUpdate,
  });
};

// const logoutUser: RequestHandler = async (req, res) => {
//   const { email, password } = req.body;
// };

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/reAuthenticate", reAuthenticate);
// router.post("/logout", logoutUser);

export default router;
