import z from "zod";

export const passwordSchema = z
  .string()
  .trim()
  .min(8, "Kata sandi harus terdiri dari minimal 8 karakter");
