import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import tables from "./tables";


export default fp(async function mysqlSetup(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  const mysql = fastify.mysql;
  try {
    // create database if not exits
    await mysql.query(`CREATE DATABASE IF NOT EXISTS ${fastify.config.MYSQL_DATABASE}`);
    await mysql.query(`USE ${fastify.config.MYSQL_DATABASE}`);
    // create tables
    for (const [tableName, createTableQuery] of Object.entries(tables)) {
      try {
        await mysql.query(createTableQuery);
      } catch (err) {
        fastify.log.error(`Failed to create table ${tableName}`, err);
        throw err;
      }
    }
  } catch (err: unknown) {
    fastify.log.error("Database setup failed", err);
    throw err;
  }
})
