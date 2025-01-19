import { FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors";
import fp from "fastify-plugin";



export default fp(async function (fastify: FastifyInstance) {
  fastify.register(fastifyCors, {
    origin: "http://localhost:5500",
  });
});
