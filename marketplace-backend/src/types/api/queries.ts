import { z, ZodType } from "zod";

export type InputType<T extends ZodType> = z.input<T>;
