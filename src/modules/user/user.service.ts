import Repository from "../../core/repository/IRepository.js";
import { DuplicateException } from "../../lib/exception.js";
import { User } from "./user.schemas.js";
import bcrypt from "bcrypt";

class UserService {
  public constructor(private readonly userRepository: Repository<User>) {}

  public async createUser(userInput: User) {
    const { password, ...rest } = userInput;
    const hashPassword = await bcrypt.hash(password, 10);
    const duplicate = await this.userRepository.find("email", rest.email);
    if (duplicate) {
      throw new DuplicateException("User already exits");
    }
    const user = await this.userRepository.insert({
      ...rest,
      password: hashPassword,
    });
    return user;
  }

  public async getUser(id: number | string) {
    return await this.userRepository.findById(id);
  }
}

export default UserService;
