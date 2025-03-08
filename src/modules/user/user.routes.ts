import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  createUserResponseSchema,
  createUserSchema,
  getUserResponseSchema,
} from "./user.schemas.js";
import UserController from "./user.controller.js";

interface UserRoutesOpts extends FastifyPluginOptions {
  userController: UserController;
}

export async function userRoutes(
  fastify: FastifyInstance,
  { userController }: UserRoutesOpts,
) {
  fastify.post(
    "/",
    {
      schema: {
        body: createUserSchema,
        response: {
          201: createUserResponseSchema,
        },
      },
    },
    userController.createUser,
  );

  fastify.get(
    "/",
    {
      onRequest: fastify.authenticate,
      schema: {
        response: {
          200: getUserResponseSchema,
        },
      },
    },
    userController.getUser,
  );
}
