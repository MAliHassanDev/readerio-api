import { MySQLPromisePool, ResultSetHeader } from "@fastify/mysql";
import Repository from "../../core/repository/IRepository.js";
import { User } from "./user.schemas.js";
import { RowDataPacket } from "@fastify/mysql";

interface UserRow extends RowDataPacket, User {}

class UserRepository implements Repository<User> {
  public constructor(private readonly db: MySQLPromisePool) {}

  public async findAll(): Promise<User[]> {
    const [rows] = await this.db.query<UserRow[]>(`SELECT * FROM users;`);
    return rows;
  }

  public async insert(user: User): Promise<User> {
    const values = Object.values(user);
    const [{ insertId }] = await this.db.query<ResultSetHeader>(
      `INSERT INTO users(name,email,password) VALUES (?)`,
      [values],
    );
    return await this.findById(insertId);
  }

  public async findById(id: string | number) {
    const [rows] = await this.db.query<UserRow[]>(
      "SELECT * FROM users WHERE id = ?",
      [id],
    );
    return rows[0];
  }

  public async find(column: keyof User, value: string) {
    const [rows] = await this.db.query<UserRow[]>(
      `SELECT * FROM users WHERE ${this.db.escapeId(column)} = ?`,
      [value],
    );
    return rows[0];
  }
}

export default UserRepository;
