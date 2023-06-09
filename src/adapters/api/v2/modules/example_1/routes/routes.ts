
// import Controller from './controllers/collect'

const apiRoutes = async (app, options) => {
  app.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: [options.tags],
      summary: 'Example Routes',
      description: 'Example Routes'
    },
    handler: async function handler(request, reply) {
      reply.code(200).send({
        statusCode: 200,
        message: 'Example base route'
      });
    }
  });
  
}


export default apiRoutes;
