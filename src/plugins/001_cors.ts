/**
 * This plugins adds http documentation
 *
 * @see https://github.com/
 */

import fp from 'fastify-plugin';
import FsCors from '@fastify/cors';
import XConfig from '@config';

export = fp(async function (fastify, _opts) {
  const config = XConfig.get('/plugins/cors')
  if(config.enabled){
    fastify.register(FsCors, config.configuration)
    console.log('Plugin CORS loaded...')
  }else{
    console.log('Plugin CORS disabled...')
  }
})


 