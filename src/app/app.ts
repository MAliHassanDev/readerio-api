import Fastify from "fastify";
import AutoLoad from "@fastify/autoload";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { UserModule } from "@modules/user/user.module.js";
import { AuthModule } from "@modules/auth/auth.module.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const fastify = Fastify({
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
  /* --------------- Register Plugins ------------ */
  await fastify.register(AutoLoad, {
    dir: join(__dirname, "..", "plugins"),
  });

  /* --------------- Register Module Routes ------------ */
  const BASE_PREFIX = fastify.config.API_BASE_PREFIX;

  void UserModule.getInstance(fastify).registerRoutes(`${BASE_PREFIX}/users`);

  void AuthModule.getInstance(fastify).registerRoutes(`${BASE_PREFIX}/auth`);

  return fastify;
}

export default initializeFastify;
