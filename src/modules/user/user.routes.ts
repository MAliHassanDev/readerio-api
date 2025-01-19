import { FastifyInstance } from "fastify";
import { createUserResponseSchema, createUserSchema } from "./user.schemas";
import { createUserHandler, getUserHandler } from "./user.controller";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/", {
    schema: {
      body: createUserSchema,
      response: {
        201: createUserResponseSchema
      }
    }
  }, createUserHandler);
  
  fastify.get("/", {
    onRequest: fastify.authenticate
  }, getUserHandler);
}


