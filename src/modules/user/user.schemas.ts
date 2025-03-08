import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/* ------------------ Request Schemas ------------------ */
const userCore = {
  name: z.string(),
  email: z.string().email(),
};

const createUser = z.object({
  password: z.string().min(8),
  ...userCore,
});
export const createUserSchema = zodToJsonSchema(createUser);

/* ------------------ Response Schemas ------------------ */

/* ------------------ Status 201 ------------------ */
const createUserResponse = z.object({
  user: z.object({
    ...userCore,
  }),
});
export const createUserResponseSchema = zodToJsonSchema(createUserResponse);

/* ------------------ Status 200 ------------------ */
const getUserResponse = z.object({
  ...userCore,
});
export const getUserResponseSchema = zodToJsonSchema(getUserResponse);
