import Example1Route from './modules/example_1/routes/routes'
import Example2Route from './modules/example_2/routes/routes'

const baseTags= 'v2'
const apiV2Routes = async (app, options) => {
  app.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: [baseTags],
      summary: 'Base Route',
      description: 'v2 API base route',
      externalDocs :{
        apiGateway: {
          enable: true,
          plugins: {
            rateLimiting: {
              schema: 'custom',
              options: {
                max_rate: 100,
                client_max_rate: 10,
                strategy: "ip",
                key: "X-Original-Forwarded-For"
              }
            }
          }
        }
      }
    },
    handler: async function handler(request, reply) {
      reply.code(200).send({
        statusCode: 200,
        message: 'API v2 base route'
      });
    }
  });
 
  // Register all this version routes
  app.register(Example1Route, { prefix: '/example1', tags: `${baseTags}/example1` });
  app.register(Example2Route, { prefix: '/example2', tags: `${baseTags}/example2` });

}

export default apiV2Routes
