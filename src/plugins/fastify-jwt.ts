import fastifyJwt, { FastifyJwtNamespace } from "@fastify/jwt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "security" }> {
    authenticate: (req: FastifyRequest, rep: FastifyReply) => void;
  }
}



export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyJwt, {
    secret: fastify.config.JWT_SECRET,
  });

  fastify.decorate(
    "authenticate",
    async (req: FastifyRequest, rep: FastifyReply) => {
      try {
        await req.jwtVerify();
      } catch (err: unknown) {
        fastify.log.error(err);
        rep.send(err);
      }
    },
  );
});
