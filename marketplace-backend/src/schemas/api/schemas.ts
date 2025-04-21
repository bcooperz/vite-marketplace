import { z } from "zod";
import { commonValidators } from "../common.js";

export const getUserByIdParamsSchema = z.object({
  id: commonValidators.id(),
});

export const createUserParamsSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[a-z]/, "Must contain lowercase")
    .regex(/[0-9]/, "Must contain number"),
  firstName: z.string(),
  lastName: z.string(),
  email: commonValidators.email(),
  address: z.string(),
  dob: z
    .string()
    .datetime({ message: "Invalid datetime string! Must be UTC." }),
});

export const updateUserParamsSchema = z.object({
  id: commonValidators.id(),
});

export const updateUserBodySchema = z.object({
  name: z.string(),
  email: commonValidators.email(),
});
