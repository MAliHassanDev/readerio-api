import UserService from "@modules/user/user.service.js";
import { LogInPayload } from "./auth.schema.js";
import { PasswordService } from "common/services/passwordService.js";
import { FastifyInstance } from "fastify";

export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly fastify: FastifyInstance,
  ) {}

  public async signIn({ email, password }: LogInPayload) {
    const user = await this.userService.getUniqueUser({ email });

    if (!user) {
      throw this.fastify.httpErrors.notFound("User not found");
    }
    // check if user password is correct
    const doPasswordsMatch = await this.passwordService.verify(
      password,
      user.password,
    );
    if (!doPasswordsMatch) {
      throw this.fastify.httpErrors.unauthorized("Incorrect password");
    }
    // create jwt token with user payload
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const accessToken = this.fastify.jwt.sign(payload, {
      expiresIn: "1h",
    });
    return accessToken;
  }
}
