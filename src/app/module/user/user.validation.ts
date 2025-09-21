export const userRegisterSchema = z.object({
  name: z.string(),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
  email: z.string().email("Invalid email"),
  phone: z.string(),
  gender: z.enum(["male", "female"]),
  role: z.enum(["user", "admin"]).default("user"),
  agreeToTerms: z.boolean(),
  agreeToPrivacy: z.boolean(),
});
import { z } from "zod";