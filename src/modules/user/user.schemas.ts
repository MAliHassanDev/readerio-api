import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const userCore = {
  name: z.string(),
  email: z.string().email(),
};

const createUser = z.object({
  password: z.string().min(8),
  ...userCore,
});

const createUserResponse = z.object({
  user: z.object({
    ...userCore,
  }),
  token: z.string(),
});

const getUserResponse = z.object({
  ...userCore,
});

// schemas
export const createUserSchema = zodToJsonSchema(createUser);
export const createUserResponseSchema = zodToJsonSchema(createUserResponse);
export const getUserResponseSchema = zodToJsonSchema(getUserResponse);
