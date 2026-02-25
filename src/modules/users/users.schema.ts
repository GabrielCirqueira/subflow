import { z } from "zod";

// Schema de validação para query params
export const getUsersQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .default("1")
    .transform((val) => Number.parseInt(val, 10))
    .pipe(z.number().min(1)),
  limit: z
    .string()
    .optional()
    .default("10")
    .transform((val) => Number.parseInt(val, 10))
    .pipe(z.number().min(1).max(100)),
  search: z.string().optional(),
  status: z.enum(["active", "inactive", "all"]).optional().default("all"),
});

export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>;

// Schema de validação para params
export const getUserByIdParamsSchema = z.object({
  id: z
    .string()
    .uuid("ID must be a valid UUID")
    .or(z.string().regex(/^\d+$/, "ID must be numeric")),
});

export type GetUserByIdParams = z.infer<typeof getUserByIdParamsSchema>;

// Schema de validação para criar usuário (exemplo)
export const createUserBodySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100),
  email: z.string().email("Invalid email format"),
  age: z.number().int().min(18, "Must be at least 18 years old").optional(),
  status: z.enum(["active", "inactive"]).default("active"),
});

export type CreateUserBody = z.infer<typeof createUserBodySchema>;
