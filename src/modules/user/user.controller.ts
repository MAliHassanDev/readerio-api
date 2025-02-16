import { FastifyReply, FastifyRequest } from "fastify";
import UserService from "./user.service.js";
import { NewUser } from "@database/types.js";

class UserController {
  public constructor(private readonly userService: UserService) {}

  public getUser = async (req: FastifyRequest, rep: FastifyReply) => {
    const { id } = req.user as { id: number | string };
    const user = await this.userService.getUser(id);
    if (!user) rep.notFound("User not found");
    rep.send(user);
  };

  public createUser = async (
    req: FastifyRequest<{ Body: NewUser }>,
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

export default UserController;
