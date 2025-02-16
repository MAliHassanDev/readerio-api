import { FastifyInstance } from "fastify";
import { PasswordHasher } from "@lib/passwordHasher.js";
import UserRepository from "./user.repository.js";
import { NewUser } from "@database/types.js";

class UserService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly fastify: FastifyInstance,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  public async createUser(userInput: NewUser) {
    const { password, ...rest } = userInput;
    const hashPassword = await this.passwordHasher.hash(password);
    const duplicateUser = await this.userRepository.findOne({
      email: rest.email,
    });
    if (duplicateUser) {
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
