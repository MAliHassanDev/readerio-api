import { MySQLPromisePool, ResultSetHeader } from "@fastify/mysql";
import { fastify } from "../../app/app";
import Repository from "../../core/repository/IRepository";
import { User } from "./user.schemas";

class UserRepository implements Repository<User> {
  public constructor(private readonly db: MySQLPromisePool) {}

  public async findAll(): Promise<User[]> {
    const [rows, fields] = await this.db.query(`SELECT * FROM users;`);
    return rows as User[];
  }

  public async insert(user: User): Promise<User> {
    const values = Object.values(user);
    const [result, _] = await this.db.query(
      `INSERT INTO users(name,email,password) VALUES (?)`,
      [values],
    );
    const { insertId } = result as ResultSetHeader;
    return (await this.findById(insertId)) as User;
  }

  public async findById(id: string | number) {
    const [rows, fields] = await this.db.query(
      "SELECT * FROM users WHERE id = ?",
      [id],
    );
    return rows ? rows[0] : null;
  }

  public async find(column: keyof User, value: string) {
    const [rows, fields] = await this.db.query(
      `SELECT * FROM users WHERE ${this.db.escapeId(column)} = ?`,
      [value],
    );
    return rows[0] ?? null;
  }
}

export default UserRepository;
