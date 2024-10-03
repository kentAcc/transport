import { z } from "zod";

export const truckSchema = z.object({
  number_plate: z.string().min(1, "required").max(30),
  description: z.string().min(1, "required"),
  status: z.string().min(1, "required"),
});
