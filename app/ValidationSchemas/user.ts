import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "name is required").max(100),
  username: z.string().min(3, "name is required").max(100),
  password: z
    .string()
    .min(6, "password must be atleast 6 characters")
    .optional()
    .or(z.literal("")),
  role: z.string().min(3, "Rol is required").max(20),
});
