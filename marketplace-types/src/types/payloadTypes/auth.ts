import {
  registerParamsSchema,
  getUserByIdParamsSchema,
  loginUserParamsSchema,
} from "../../schemas/auth.js";
import { z } from "zod";

export type RegisterPayload = z.infer<typeof registerParamsSchema>;
export type LoginUserPayload = z.infer<typeof loginUserParamsSchema>;
export type GetUserPayload = z.infer<typeof getUserByIdParamsSchema>;
