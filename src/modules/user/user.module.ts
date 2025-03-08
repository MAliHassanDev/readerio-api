import { FastifyInstance } from "fastify";
import { userRoutes } from "./user.routes.js";
import UserController from "./user.controller.js";
import UserService from "./user.service.js";
import UserRepository from "./user.repository.js";
import { PasswordService } from "common/services/passwordService.js";

export class UserModule {
  private readonly userService: UserService;
  private readonly userController: UserController;
  private static instance: UserModule | undefined;

  private constructor(private readonly fastify: FastifyInstance) {
    const userRepository = new UserRepository(fastify.db);
    this.userService = new UserService(
      userRepository,
      fastify,
      new PasswordService(),
    );
    this.userController = new UserController(this.userService);
  }

  public static getInstance(fastify: FastifyInstance) {
    if (!UserModule.instance) {
      UserModule.instance = new UserModule(fastify);
    }
    return UserModule.instance;
  }

  public async registerRoutes(prefix?: string) {
    await this.fastify.register(userRoutes, {
      prefix,
      userController: this.userController,
    });
  }

  public getExports() {
    return {
      userService: this.userService,
    };
  }
}
