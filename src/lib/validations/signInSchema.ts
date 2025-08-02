import z from "zod";
import { passwordSchema } from "./passwordShema";

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "email wajib diiisi")
    .refine((val) => z.email(val).safeParse(val).success, {
      message: "email tidak valid",
    }),
  password: passwordSchema,
});
