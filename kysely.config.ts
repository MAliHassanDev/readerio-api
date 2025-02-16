import {} from "kysely";
import { defineConfig } from "kysely-ctl";
import { createPool } from "mysql2";
import { join } from "path";

export default defineConfig({
  dialect: "mysql2",
  dialectConfig: {
    pool: createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: 3306,
      connectionLimit: 10,
    }),
  },
  migrations: {
    migrationFolder: join("src/database", "migrations"),
  },
});
