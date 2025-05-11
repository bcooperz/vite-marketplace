import { Request, Response, Router } from "express";
import { database } from "../config/database.js";
import { HttpStatusCode } from "../errors/enums/HttpStatusCode.js";

const router = Router();

const getUser = async (req: Request, res: Response) => {
  const email = req.session.user.email;
  const user = await database
    .getPool()
    .query("SELECT * FROM users WHERE email = $1", [email]);

  console.log(user);

  res.status(HttpStatusCode.OK).json(user);
};

router.get("/user", getUser);

export default router;
