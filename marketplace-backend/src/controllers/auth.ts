import {
  registerParamsSchema,
  loginUserParamsSchema,
  LoginResponse,
  RegisterResponse,
  ReAuthenticateResponse,
} from "@marketplace-types";
import bcrypt from "bcrypt";
import { Router, Request, Response } from "express";
import NotFoundError from "../errors/classes/NotFoundError.js";
import BadRequestError from "../errors/classes/BadRequestError.js";
import { HttpStatusCode } from "../errors/enums/HttpStatusCode.js";
import { UserCreate } from "src/types/user/index.js";
import { UserService } from "src/services/UserService.js";

// todo: is this vulnerable to timing attacks?
const getLoginUserRoute = (userService: UserService) => {
  return async (req: Request, res: Response<LoginResponse>) => {
    const { email, password } = loginUserParamsSchema.parse(req.body);

    const user = await userService.getUserByEmail(email);

    if (!user || !user.password_hash || !user.id) {
      throw new NotFoundError();
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new NotFoundError();
    }

    const lastUpdate = new Date().getTime();

    // Session creation
    req.session.user = {
      id: user.id,
      email: user.email,
      lastActivity: new Date().toISOString(),
      lastUpdate: lastUpdate,
    };

    res.status(HttpStatusCode.OK).json({
      user: {
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      updatedAt: lastUpdate,
    });
  };
};

const getReAuthenticateRoute = () => {
  return async (req: Request, res: Response<ReAuthenticateResponse>) => {
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
};

const getRegisterUserRoute = (userService: UserService) => {
  return async (req: Request, res: Response<RegisterResponse>) => {
    const { email, firstName, lastName, password, dob, confirmPassword } =
      registerParamsSchema.parse(req.body);

    if (password !== confirmPassword) {
      throw new BadRequestError("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: UserCreate = {
      password,
      email,
      firstName,
      lastName,
      dob: new Date(dob),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const userDetails = await userService.createUser(user, hashedPassword);

    if (!userDetails.id) {
      throw new BadRequestError("Failed to create user");
    }

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
};

export const createAuthRoutes = (userService: UserService) => {
  const router = Router();

  router.post("/register", getRegisterUserRoute(userService));
  router.post("/login", getLoginUserRoute(userService));
  router.get("/reAuthenticate", getReAuthenticateRoute());
  // router.post("/logout", logoutUser);

  return router;
};

// const logoutUser: RequestHandler = async (req, res) => {
//   const { email, password } = req.body;
// };

// todo: remove?
// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/reAuthenticate", reAuthenticate);
// router.post("/logout", logoutUser);
