import fastifyHelmet from "@fastify/helmet";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyHelmet, {
    crossOriginResourcePolicy: true,
  });
});
