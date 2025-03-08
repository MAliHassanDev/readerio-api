import { FastifyInstance } from "fastify";
import { PasswordService } from "common/services/passwordService.js";
import UserRepository from "./user.repository.js";
import { NewUser, User } from "@database/types.js";

class UserService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly fastify: FastifyInstance,
    private readonly passwordHasher: PasswordService,
  ) {}

  public async createUser(userInput: NewUser) {
    const { password, ...rest } = userInput;
    // hash password
    const hashPassword = await this.passwordHasher.hash(password);
    // check if user already exists
    const duplicateUser = await this.userRepository.findOne({
      email: rest.email,
    });
    if (duplicateUser) {
      throw this.fastify.httpErrors.conflict("User already exits");
    }
    // create new user
    const user = await this.userRepository.insert({
      ...rest,
      password: hashPassword,
    });

    return user;
  }

  public async getUniqueUser(criteria: Partial<Pick<User, "email" | "id">>) {
    return await this.userRepository.findOne(criteria);
  }
}

export default UserService;
