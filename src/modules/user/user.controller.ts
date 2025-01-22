import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "./user.schemas.js";
import UserService from "./user.service.js";

class UserHandler {
  public constructor(private readonly userService: UserService) {}

  public getUser = async (req: FastifyRequest, rep: FastifyReply) => {
    const { id } = req.user as { id: number | string };
    const user = await this.userService.getUser(id);
    if (!user) rep.notFound("User not found");
    rep.send(user);
  };

  public createUser = async (
    req: FastifyRequest<{ Body: User }>,
    rep: FastifyReply,
  ) => {
    const user = await this.userService.createUser(req.body);
    const token = await rep.jwtSign(
      { email: user.email, id: user.id },
      { expiresIn: "10h" },
    );
    rep.code(201).send({ user, token });
  };
}

export default UserHandler;
