import { FastifyInstance } from "fastify";
import initializeFastify from "./app/app";

class Server {
  public constructor(private readonly app: FastifyInstance) {}

  public start = async () => {
    this.app.log.info("Starting Server....");
    const { HOST, PORT } = this.app.config;
    const address = await this.app.listen({ host: HOST, port: parseInt(PORT) });
    this.app.log.info(`Server listening at ${address}`);
  };

  public shutdown = async () => {
    this.app.log.info("Gracefully shutting down...");
    await this.app.close();
    process.exit();
  };
}


async function main() {
  let server: Server | null = null;
  let fastify: FastifyInstance | null = null;
  try {
    fastify = await initializeFastify();
    server = new Server(fastify);
    await server.start();
  } catch (err: unknown) {
    fastify?.log.error(err);
    server?.shutdown();
  }
  process.on("uncaughtException", (error: Error) => {
    fastify?.log.error("Uncaught Error",error);
    server?.shutdown()
  });

  process.on("SIGINT", (signal: NodeJS.Signals) => {
    fastify?.log.info(`Received ${signal} signal.`);
    server?.shutdown();
  });

  process.on("SIGTERM", (signal: NodeJS.Signals) => {
    fastify?.log.info(`Received ${signal} signal.`);
    server?.shutdown()
  });

  process.on("unhandledRejection", (reason: string) => {
    fastify?.log.error(`Unhandled Promise: ${reason}.`);
    server?.shutdown();
  });
}

main();