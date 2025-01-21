import Fastify from "fastify";
import userRoutes from "../modules/user/user.routes";
import AutoLoad from "@fastify/autoload";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dbSetup from "../database/setup.js";
import ErrorHandler from "../core/errors/errorHandler.js";

const __dirname = dirname(fileURLToPath(import.meta.url))

export const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});


async function initializeFastify() {
  // Error handler
  fastify.setErrorHandler(ErrorHandler);
  
  // Plugins
  await fastify.register(AutoLoad, {
    dir: join(__dirname, "..", "plugins")
  })

  // Routes
  await fastify.register(userRoutes,{prefix: "/api/vi/users"});

  return fastify;
}

export default initializeFastify;