import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "./user.schemas";
import UserService from "./user.service";
import { NotFoundException } from "../../lib/exception";

class UserHandler {
  public constructor(private readonly userService: UserService) {}

  public getUser = async (req: FastifyRequest, rep: FastifyReply) => {
    const { id } = req.user as { id: number | string };
    const user = await this.userService.getUser(id);
    if (!user) throw new NotFoundException();
    console.log(user);
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
