import fastifySwaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(async function swaggerUi(fastify: FastifyInstance) {
  fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });
});
