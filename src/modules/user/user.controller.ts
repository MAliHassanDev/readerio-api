import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserBody } from "./user.schemas";
import userService from "./user.service";
import { fastify } from "../../app/app";

export async function createUserHandler(
  req: FastifyRequest<{ Body: CreateUserBody }>,
  rep: FastifyReply,
) {
  const user = await userService.createUser(req.body);
  const token = fastify.jwt.sign({ email: user.email },{expiresIn: "1h"});
  rep.code(201).send({user,token});
}


export async function getUserHandler(
  req:FastifyRequest,
  rep:FastifyReply
) {
  const user = req.user;
  rep.send(user)
}