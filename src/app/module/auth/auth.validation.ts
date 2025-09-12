import z from "zod";

export const loginSchema = z.object({

    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(8),
  
});