import { FastifyInstance } from "fastify";
import {
  createUserResponseSchema,
  createUserSchema,
  getUserResponseSchema,
} from "./user.schemas.js";
import UserHandler from "./user.controller.js";
import UserService from "./user.service.js";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default async function userRoutes(fastify: FastifyInstance) {
  const userRepository = new UserRepository(fastify.mysql);
  const userService = new UserService(userRepository, fastify, bcrypt);
  const userHandler = new UserHandler(userService);

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
