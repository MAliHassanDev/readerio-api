import { FastifyInstance } from "fastify";
import initializeFastify from "./app/app";



async function main() {
  let fastify: FastifyInstance|null = null;
  try {
    fastify = await initializeFastify();
    const port = parseInt(fastify.config.PORT ?? 3000);
    const host = "0.0.0.0";
    const address = await fastify.listen({ port, host });
    fastify.log.info(`Server listening at ${address}`);
  } catch (err: unknown) {
    if (fastify) {
      fastify.log.error(err);
    } else {
      console.error("Failed to Initialize Fastify", err);
    }
    process.exit(1);
  }
}

main();