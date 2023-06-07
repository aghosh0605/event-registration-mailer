// ESM
import Fastify from "fastify";
import register from "./register.js";
/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async (request, reply) => {
  return { message: "API Working" };
});

fastify.register(register);

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
