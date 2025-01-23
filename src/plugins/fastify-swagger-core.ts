import fastifySwagger from "@fastify/swagger";
import { FastifyInstance } from "fastify";
import fn from "fastify-plugin";

export default fn(async (fastify: FastifyInstance) => {
  fastify.register(fastifySwagger);
});
