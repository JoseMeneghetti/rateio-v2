import * as z from "zod";

export const formAuthSigninSchema = z.object({
  email: z.string().email().min(1, {
    message: "E-mail is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const formAuthSignupSchema = z.object({
  email: z.string().email().min(1, {
    message: "E-mail is required",
  }),
  password: z.string().min(6),
});
