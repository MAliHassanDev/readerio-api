import { Generated, Insertable, Kysely, Selectable, Updateable } from "kysely";

/* -------------------- Kysely-Database-instance ------------------ */
export type DatabaseInstance = Kysely<Database>;

/* -------------------- Database -------------------- */

export interface Database {
  user: UserTable;
}

/* -------------------- User-Table -------------------- */
export interface UserTable {
  id: Generated<number>;
  name: string;
  password: string;
  email: string;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
