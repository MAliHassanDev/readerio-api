import Repository from "@core/repository/IRepository.js";
import { User } from "./user.schemas.js";
import Bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";

class UserService {
  public constructor(
    private readonly userRepository: Repository<User>,
    private readonly fastify: FastifyInstance,
    private readonly bcrypt: typeof Bcrypt,
  ) {}

  public async createUser(userInput: User) {
    const { password, ...rest } = userInput;
    const hashPassword = await this.bcrypt.hash(password, 10);
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
