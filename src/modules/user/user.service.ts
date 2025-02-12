import Repository from "@core/repository/IRepository.js";
import { User } from "./user.schemas.js";
import { FastifyInstance } from "fastify";
import { PasswordHasher } from "@lib/passwordHasher.js";

class UserService {
  public constructor(
    private readonly userRepository: Repository<User>,
    private readonly fastify: FastifyInstance,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  public async createUser(userInput: User) {
    const { password, ...rest } = userInput;
    const hashPassword = await this.passwordHasher.hash(password);
    const duplicate = await this.userRepository.find("email", rest.email);
    if (duplicate) {
      throw this.fastify.httpErrors.conflict("User already exits");
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
