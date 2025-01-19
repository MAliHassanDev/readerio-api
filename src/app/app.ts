import Fastify from "fastify";
import userRoutes from "../modules/user/user.routes";
import AutoLoad from "@fastify/autoload";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
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
  // Plugins
  await fastify.register(AutoLoad, {
    dir: join(__dirname, "..", "plugins")
  })

  // Routes
  await fastify.register(userRoutes,{prefix: "/api/vi/users"});

  return fastify;
}

export default initializeFastify;
