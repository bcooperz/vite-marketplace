import { z } from "zod";
import { commonValidators } from "./common.js";

export const getUserByIdParamsSchema = z.object({
  id: commonValidators.id(),
});

export const createUserParamsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  email: commonValidators.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[a-z]/, "Must contain lowercase")
    .regex(/[0-9]/, "Must contain number"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
});

export const updateUserParamsSchema = z.object({
  id: commonValidators.id(),
});

export const updateUserBodySchema = z.object({
  name: z.string(),
  email: commonValidators.email(),
});

export const loginUserParamsSchema = z.object({
  email: commonValidators.email(),
  password: z.string(),
});
