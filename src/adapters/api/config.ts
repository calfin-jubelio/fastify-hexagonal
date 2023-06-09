import apiV1Routes from "./v1/routes";
import apiV2Routes from "./v2/routes";
import fp from 'fastify-plugin';

const router = fp(async function (server, _opts) {
    server
    .register(apiV1Routes, { prefix: 'api/v1' })
    .register(apiV2Routes, { prefix: 'api/v2' })
    // Register Routes Exception Handler
    .setNotFoundHandler((request, reply) => {
      server.log.debug(`Route not found: ${request.method}:${request.raw.url}`)
      reply.status(404).send({
        statusCode: 404,
        error: "NOT_FOUND",
        message: `Route ${request.method}:${request.raw.url} not found`
      }) 
    })
    .setErrorHandler((err, request, reply) => {
      server.log.debug(`Request url: ${request.raw.url}`)
      server.log.debug(`Payload: ${request.body}`)
      server.log.error(`Error occurred: ${err}`)
  
      const code = err.statusCode ?? 400
      reply.status(code).send({
        statusCode: code,
        error: err.name ?? "Bad Request",
        message: err.message ?? err
      })
    });
  })
  
export {
    router
}