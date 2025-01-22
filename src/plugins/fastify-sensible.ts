import fastifySensible from "@fastify/sensible";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifySensible);
});
