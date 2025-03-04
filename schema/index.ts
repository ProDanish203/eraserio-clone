import { z } from "zod";

export const createDocumentSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be 50 characters or less"),
  description: z
    .string()
    .max(80, "Description must be 80 characters or less")
    .optional(),
});

export type createDocumentSchemaType = z.infer<typeof createDocumentSchema>;
