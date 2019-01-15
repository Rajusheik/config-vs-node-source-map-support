import * as fp from "fastify-plugin";
import * as fastify from "fastify";

export default fp(async (server, opts, next) => {
  const rOpts: fastify.RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            pong: {
              type: "string"
            }
          }
        }
      }
    }
  };

  server.get("/ping", rOpts, (request, reply) => {
    throw new Error("demo error");
    reply.code(200).send({ pong: "it worked!" });
  });
  next();
});
