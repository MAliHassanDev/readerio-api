import { DatabaseInstance, User } from "@database/types.js";
import { BaseRepository } from "base/repository/baseRepository.js";

class UserRepository extends BaseRepository<"user"> {
  public constructor(db: DatabaseInstance) {
    super(db, "user");
  }

  public async find(criteria: Partial<User>): Promise<User[]> {
    let query = this.db.selectFrom("user");

    if (criteria.id) {
      query = query.where("id", "=", criteria.id);
    }

    if (criteria.name) {
      query = query.where("name", "=", criteria.name);
    }

    if (criteria.email) {
      query = query.where("email", "=", criteria.email);
    }

    return await query.selectAll().execute();
  }
}

export default UserRepository;
