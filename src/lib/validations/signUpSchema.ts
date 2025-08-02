import z from "zod";
import { passwordSchema } from "./passwordShema";

export const signUpSchema = z
  .object({
    fullname: z
      .string()
      .trim()
      .min(2, "Nama lengkap wajib diisi dan minimal 2 karakter")
      .max(50, "Nama lengkap tidak boleh lebih dari 50 karakter"),
    email: z
      .string()
      .trim()
      .min(1, "Email wajib diisi")
      .refine((val) => z.email(val).safeParse(val).success, {
        message: "Email tidak valid",
      }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Konfirmasi kata sandi tidak sama",
      });
    }
  });
