import ExampleOneController from "../controllers";

const controller = new ExampleOneController()

const apiRoutes = async (app, options) => {
  app.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: [options.tags],
      summary: 'Example Routes',
      description: 'Example Routes'
    },
    handler: controller.create
  });
  
}


export default apiRoutes;
