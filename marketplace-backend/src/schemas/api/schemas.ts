import { z } from "zod";
import { commonValidators } from "../common.js";

export const getUserByIdParamsSchema = z.object({
  id: commonValidators.id(),
});

export const createUserParamsSchema = z.object({
  name: z.string(),
  email: commonValidators.email(),
});

export const updateUserParamsSchema = z.object({
  id: commonValidators.id(),
});

export const updateUserBodySchema = z.object({
  name: z.string(),
  email: commonValidators.email(),
});
