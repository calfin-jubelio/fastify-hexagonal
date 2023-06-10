'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')

import fastify from 'fastify';
import os from 'os';
import pino from 'pino';
import { JsonschemaValidator } from './utilities';
import { router } from '@/adapters/api/config';


// Build Server
let validator:any = JsonschemaValidator
const build = async () => {
  // Fastify Server
  let server = fastify({
    bodyLimit: 1048576 * 2,
    logger: process.env.NODE_ENV!='test' ? 
            pino({
              formatters: {
                level (level) {
                  return { level }
                }
              },
              timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
              level: process.env.LOG_LEVEL || 'debug'
            }) : null,
    schemaController: {
      compilersFactory: {
        buildValidator: validator
      }
    }
  });
 
  console.table(os.cpus()); 

  // PLUGINS
  await server
  .register(AutoLoad, {
      dir: path.join(__dirname, 'plugins')
   });

  // ROUTES
  await server
  // Register Base Routes
  .register(router, {})

  return server
}

// implement inversion of control to make the code testable
export {
  build
}