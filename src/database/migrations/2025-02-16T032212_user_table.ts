/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  /* ------ User Table --------- */
  await db.schema
    .createTable("user")
    .addColumn("id", "bigint", col => col.primaryKey().autoIncrement())
    .addColumn("name", "varchar(100)", col => col.notNull())
    .addColumn("email", "varchar(255)", col => col.notNull().unique())
    .addColumn("password", "varchar(255)", col => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("user").execute();
}
