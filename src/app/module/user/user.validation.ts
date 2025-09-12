import { z } from "zod";
export const userRegisterSchema = z.object({

    name: z.string(),
    password: z
      .string()
      .min(8)
      .regex(/[0-9]/)
      .regex(/[^A-Za-z0-9]/),
    email: z.string().email(),
    phone: z.string(),
    gender: z.enum(["male", "female"]),

});


