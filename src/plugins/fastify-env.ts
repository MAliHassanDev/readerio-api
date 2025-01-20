import { FastifyInstance } from "fastify";
import fastifyEnv from "@fastify/env";
import fp from "fastify-plugin";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";


const configSchema = z.object({
  PORT: z.string().default("3000"),
  AVATAR_API: z.string().default("https://ui-avatars.com/api/"),
  JWT_SECRET: z.string().default("aldjfkajsdlfjalskdjfljdsad")
})

const configJsonSchema = zodToJsonSchema(configSchema);
declare module "fastify" {
  interface FastifyInstance {
    config: z.infer<typeof configSchema>
  }
}
export default fp(async function (fastify: FastifyInstance) {
  const options = {
    data: process.env,
    confKey: "config",
    schema: configJsonSchema,
    dotenv: true,
  };
  await fastify.register(fastifyEnv, options);
});
 