import { FastifyInstance } from "fastify";
import {
  createUserResponseSchema,
  createUserSchema,
  getUserResponseSchema,
} from "./user.schemas.js";
import UserController from "./user.controller.js";
import UserService from "./user.service.js";
import UserRepository from "./user.repository.js";
import { PasswordHasher } from "@lib/passwordHasher.js";

export default async function userRoutes(fastify: FastifyInstance) {
  const userRepository = new UserRepository(fastify.db);

  const userService = new UserService(
    userRepository,
    fastify,
    new PasswordHasher(),
  );

  const userHandler = new UserController(userService);

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
