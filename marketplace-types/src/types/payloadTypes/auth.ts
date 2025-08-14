import {
  createUserParamsSchema,
  getUserByIdParamsSchema,
  loginUserParamsSchema,
} from "../../schemas/auth.js";
import { z } from "zod";

export type CreateUserPayload = z.infer<typeof createUserParamsSchema>;
export type LoginUserPayload = z.infer<typeof loginUserParamsSchema>;
export type GetUserPayload = z.infer<typeof getUserByIdParamsSchema>;
