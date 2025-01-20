import fastifyMysql, { MySQLPromisePool } from "@fastify/mysql";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    mysql: MySQLPromisePool;
  }
}

export default fp(async (fastify: FastifyInstance) => {
  await fastify.register(fastifyMysql, {
    promise: true,
    connectionString: "mysql://hassan:hassan1122@db/readerdb",
  });
});
