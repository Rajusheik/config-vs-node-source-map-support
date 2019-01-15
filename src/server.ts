import * as sourceMapSupport from "source-map-support";
sourceMapSupport.install({});

import * as config from "config";

import * as fastify from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

import pingRoutes from "./routes/ping";

// Create a http server. We pass the relevant typings for our http version used.
// By passing types we get correctly typed access to the underlying http objects in routes.
// If using http2 we'd pass <http2.Http2Server, http2.Http2ServerRequest, http2.Http2ServerResponse>
const server: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({});

// just comment this thing out, and see the correct stacktrace
config.get("a");

server.register(pingRoutes);
const start = async () => {
  try {
    await server.listen(3000, "0.0.0.0");
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
};

start();
