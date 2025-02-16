import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { createPool } from "mysql2";
import { Kysely, MysqlDialect } from "kysely";
import { Database, DatabaseInstance } from "@database/types.js";

declare module "fastify" {
  interface FastifyInstance {
    db: DatabaseInstance;
  }
}

export default fp(async function mysqlSetup(fastify: FastifyInstance) {
  const dialect = new MysqlDialect({
    pool: createPool({
      database: fastify.config.MYSQL_DATABASE,
      host: fastify.config.MYSQL_HOST,
      user: fastify.config.MYSQL_USER,
      password: fastify.config.MYSQL_PASSWORD,
      waitForConnections: true,
      port: 3306,
      connectionLimit: fastify.config.MYSQL_MAX_CONNECTIONS,
    }),
  });
  const db = new Kysely<Database>({ dialect });
  fastify.decorate("db", db);
});
