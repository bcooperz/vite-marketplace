import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string(),
    // .min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    dob: z.object({
      day: z.string().min(1, "Day is required").max(2).regex(/^\d+$/, "Day must be a number"),
      month: z.string().min(1, "Month is required").max(2).regex(/^\d+$/, "Month must be a number"),
      year: z.string().min(1, "Year is required").max(4).regex(/^\d+$/, "Year must be a number"),
    }),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain uppercase")
      .regex(/[a-z]/, "Password must contain lowercase")
      .regex(/[0-9]/, "Password must contain number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
