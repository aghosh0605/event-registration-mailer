// ESM
import Fastify from "fastify";
import register from "./register.js";
import cors from "@fastify/cors";
import path from "path";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  // put your options here
  origin: "*",
  methods: ["GET", "POST"],
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "templates"),
  prefix: "/templates/", // optional: default '/'
  // constraints: { host: "example.com" }, // optional: default {}
});

fastify.get("/", async (request, reply) => {
  return { message: "API is working properly" };
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
