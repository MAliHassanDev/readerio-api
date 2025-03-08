import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { AuthController } from "./auth.controller.js";
import { loginResponseSchema, logInSchema } from "./auth.schema.js";

interface AuthRouteOptions extends FastifyPluginOptions {
  authController: AuthController;
}

export async function authRoutes(
  fastify: FastifyInstance,
  { authController }: AuthRouteOptions,
) {
  fastify.post(
    "/login",
    {
      schema: {
        body: logInSchema,
        response: {
          200: loginResponseSchema,
        },
      },
    },
    authController.login,
  );
}
