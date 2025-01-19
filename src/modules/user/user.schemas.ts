import { string, z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const userCore = {
  name: z.string(),
  email: z.string().email(),
};

// POST /create Request Schema
const createUser = z.object({
  password: z.string().min(8),
  ...userCore,
});

export const createUserSchema = zodToJsonSchema(createUser);

export type CreateUserBody = z.infer<typeof createUser>;

// POST /create Response Schema
const createUserResponse = z.object({
  user: z.object({
   ...userCore
  }),
  token: z.string()
});

export const createUserResponseSchema = zodToJsonSchema(createUserResponse);



