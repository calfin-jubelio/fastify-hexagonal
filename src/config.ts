import Confidence from 'confidence';
import Pack from '@root/package.json';

// Confidence criteria
let internals:any = {
    criteria: {
        env: process.env.NODE_ENV
    }
};

const allowedOrigin:string = process.env.APP_CORE_ALLOWED_ORIGIN || ''
//  Confidence document object
internals.config = {
    $meta: 'App configuration files',
    /* ----------------- Application -------------- */
    application: {
        info: {
          title: Pack.name,
          version: Pack.version,
          description: Pack.description
        },
        environments: ['test','production','staging','development'],
        environment: {
            $filter: 'env',
            test: "test",
            production: "production",
            staging: "staging",
            development: "development",
            $default: "development"
        },
        port: {
            $filter: 'env',
            test: 7000,
            $default: 3000
        },
        allowedOrigin: {
            $filter: 'env',
            test: allowedOrigin.split(','),
            production: allowedOrigin.split(','),
            staging: allowedOrigin.split(','),
            development: allowedOrigin.split(','),
            $default: allowedOrigin.split(',')
        }
    },
    plugins: {
      cors: {
        enabled: true,
        configuration: {
          credentials: true,
          origin: {
            $filter: 'env',
            test: allowedOrigin.split(','),
            production: allowedOrigin.split(','),
            staging: allowedOrigin.split(','),
            development: allowedOrigin.split(','),
            $default: allowedOrigin.split(',')
          }, 
          preflight: false,
          preflightContinue: false,
          methods: ['GET','POST','OPTIONS','PATCH','PUT']
        }
      },
      cookie: {
        enabled: true,
        configuration: {
          secret: "my-secret", // for cookies signature
          parseOptions: {}     // options for parsing cookies
        }
      },
      helmet: {
        enabled: true,
        configuration: {
          contentSecurityPolicy: {
            directives: {
              baseUri: ['\'self\''],
              defaultSrc: ['\'self\''],
              scriptSrc: ['\'self\''],
              objectSrc: ['\'self\''],
              workerSrc: ['\'self\'', 'blob:'],
              frameSrc: ['\'self\''],
              formAction: ['\'self\''],
              upgradeInsecureRequests: []
            }
          }
        }
      },
      swagger: {
        enabled: true,
        configuration: {
          routePrefix: '/documentation',
          mode: 'dynamic',
          swagger: {
            info: {
                    title: Pack.name,
                    version: Pack.version,
                    description: Pack.description,
                    contact: {
                            name: Pack.maintainers[0].name,
                            email: Pack.maintainers[0].email,
                            url: Pack.maintainers[0].url
                    }
            },
            grouping: 'tags',
            host: process.env.HOST,
            schemes: ['http','https'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [

            ],
          },
          uiConfig: {
            docExpansion: 'none',
            deepLinking: false
          },
          uiHooks: {
            onRequest: function (request, reply, next) { next() },
            preHandler: function (request, reply, next) { next() }
          },
          staticCSP: true,
          transformStaticCSP: (header) => header,
          exposeRoute: true
        }
      },
      validatorCompiler: {
        enabled: true
      }
    },
};

internals.store = new Confidence.Store(internals.config);

export default {
  get: function(key:string, criteria:any=internals.criteria) {
    return internals.store.get(key, criteria);
  }
};
