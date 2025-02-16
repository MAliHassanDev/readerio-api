/* eslint-disable @typescript-eslint/unbound-method */
import { Database, DatabaseInstance } from "@database/types.js";
import { Insertable, Selectable } from "kysely";

export class Repository<K extends keyof Database> {
  public constructor(
    protected readonly db: DatabaseInstance,
    private readonly table: K,
  ) {}

  // inserts new row into the table
  public async insert(row: Insertable<Database[K]>) {
    const { insertId } = await this.db
      .insertInto(this.table)
      .values(row)
      .executeTakeFirstOrThrow();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (await this.findById(insertId!)) as Selectable<Database[K]>;
  }

  // fetches all rows from the table
  public async findAll() {
    return await this.db.selectFrom(this.table).selectAll().execute();
  }

  // fetches a row by id
  public async findById(id: string | number | bigint) {
    const { ref } = this.db.dynamic;
    return await this.db
      .selectFrom(this.table)
      .where(ref("id"), "=", id)
      .selectAll()
      .executeTakeFirst();
  }

  // fetches all rows that match the criteria
  public async find(criteria: Partial<Selectable<Database[K]>>) {
    let query = this.db.selectFrom(this.table);
    const { ref } = this.db.dynamic;

    for (const [key, value] of Object.entries(criteria)) {
      query = query.where(ref(key), "=", value);
    }

    return await query.selectAll().execute();
  }
}
