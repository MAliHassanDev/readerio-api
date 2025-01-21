import fastifyMysql, { MySQLPromisePool } from "@fastify/mysql";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    mysql: MySQLPromisePool;
  }
}

export default fp(async (fastify: FastifyInstance) => {
  const {MYSQL_DATABASE,MYSQL_HOST,MYSQL_USER, MYSQL_PASSWORD} = fastify.config;
  await fastify.register(fastifyMysql, {
    promise: true,
    connectionString: `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}/${MYSQL_DATABASE}`,
  });
});
