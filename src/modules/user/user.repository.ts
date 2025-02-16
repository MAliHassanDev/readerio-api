import { DatabaseInstance, User } from "@database/types.js";
import { Repository } from "base/repository/baseRepository.js";

class UserRepository extends Repository<"user"> {
  public constructor(db: DatabaseInstance) {
    super(db, "user");
  }

  public async findOne(criteria: Partial<Pick<User, "email" | "id">>) {
    let query = this.db.selectFrom("user");

    if (criteria.email) {
      query = query.where("email", "=", criteria.email);
    }

    if (criteria.id) {
      query = query.where("id", "=", criteria.id);
    }

    return await query.selectAll().executeTakeFirst();
  }
}

export default UserRepository;
