import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./auth.service.js";
import { LogInPayload } from "./auth.schema.js";

export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  public login = async (
    req: FastifyRequest<{ Body: LogInPayload }>,
    rep: FastifyReply,
  ) => {
    const access_token = await this.authService.signIn(req.body);
    rep.send({ access_token });
  };
}
