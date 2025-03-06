import { z } from "zod";

export const commonValidators = {
  id: () => z.string().regex(/^\d+$/).transform(Number),
  email: () => z.string().email(),
};
