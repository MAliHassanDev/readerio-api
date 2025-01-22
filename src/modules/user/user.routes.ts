import { FastifyInstance } from "fastify";
import {
  createUserResponseSchema,
  createUserSchema,
  getUserResponseSchema,
} from "./user.schemas.js";
import UserHandler from "./user.controller.js";
import UserService from "./user.service.js";
import UserRepository from "./user.repository.js";

export default async function userRoutes(fastify: FastifyInstance) {
  const userHandler = new UserHandler(
    new UserService(new UserRepository(fastify.mysql)),
  );

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
    userHandler.createUser,
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
    userHandler.getUser,
  );
}
