import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/* ------------------ Request Schemas ------------------ */

const logInPayload = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LogInPayload = z.infer<typeof logInPayload>;

export const logInSchema = zodToJsonSchema(logInPayload);

/* ------------------ Response Schemas ------------------ */

/* ---------- Status 200 ---------- */

export const loginResponseSchema = zodToJsonSchema(
  z.object({
    access_token: z.string(),
  }),
);
