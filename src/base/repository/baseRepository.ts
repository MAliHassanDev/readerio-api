import { Database, DatabaseInstance } from "@database/types.js";
import { Insertable, Selectable } from "kysely";

export class BaseRepository<K extends keyof Database> {
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
    return (await this.findById(Number(insertId!))) as Selectable<Database[K]>;
  }

  public async findOne(criteria: Partial<Database[K]>) {
    let query = this.db.selectFrom(this.table);

    for (const key in criteria) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      const value = criteria[key] as unknown as any;

      query = query.where(key, "=", value);
    }

    return await query.selectAll().executeTakeFirst();
  }
  // fetches all rows from the table
  public async findAll() {
    return await this.db.selectFrom(this.table).selectAll().execute();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async findById(id: any) {
    return await this.db
      .selectFrom(this.table)
      .where("id", "=", id)
      .selectAll()
      .executeTakeFirst();
  }
}

export class UserRepository extends BaseRepository<"user"> {
  public constructor(db: DatabaseInstance) {
    super(db, "user");
  }
}
