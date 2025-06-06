import { Request, Response, Router } from "express";
import { HttpStatusCode } from "../errors/enums/HttpStatusCode.js";

const router = Router();

const getConfig = (req: Request, res: Response) => {
  res.status(HttpStatusCode.OK).json({
    sessionDuration: Number(process.env.SESSION_DURATION),
  });
};

router.get("/", getConfig);

export default router;
