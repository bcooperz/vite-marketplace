import { Request, Response, Router } from "express";
import { database } from "../config/database.js";
import { HttpStatusCode } from "../errors/enums/HttpStatusCode.js";
import NotFoundError from "../errors/classes/NotFoundError.js";

const router = Router();

const getUser = async (req: Request, res: Response) => {
  const email = req.session.user.email;
  const user = await database
    .getPool()
    .query("SELECT * FROM users WHERE email = $1", [email]);

  if (!user.rows[0]) {
    throw new NotFoundError();
  }

  res.status(HttpStatusCode.OK).json(user.rows[0]);
};

router.get("/user", getUser);

export default router;
