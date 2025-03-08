import { AuthService } from "./auth.service.js";
import { PasswordService } from "common/services/passwordService.js";
import { FastifyInstance } from "fastify";
import { UserModule } from "@modules/user/user.module.js";
import { AuthController } from "./auth.controller.js";
import { authRoutes } from "./auth.routes.js";

export class AuthModule {
  public readonly authService: AuthService;
  public readonly authController: AuthController;
  private static instance: AuthModule | undefined;

  private constructor(public readonly fastify: FastifyInstance) {
    const { userService } = UserModule.getInstance(fastify).getExports();
    this.authService = new AuthService(
      userService,
      new PasswordService(),
      fastify,
    );
    this.authController = new AuthController(this.authService);
  }

  public static getInstance(fastify: FastifyInstance) {
    if (!AuthModule.instance) {
      AuthModule.instance = new AuthModule(fastify);
    }
    return AuthModule.instance;
  }

  public async registerRoutes(prefix?: string) {
    await this.fastify.register(authRoutes, {
      prefix,
      authController: this.authController,
    });
  }

  public getExports() {
    return {
      authService: this.authService,
    };
  }
}
