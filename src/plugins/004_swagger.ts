/**
 * This plugins adds http documentation
 *
 * @see https://github.com/
 */

import fp from 'fastify-plugin'
import FsSwagger from '@fastify/swagger';
import XConfig from '@config';

export = fp(async function (fastify, _opts) {
  const config = XConfig.get('/plugins/swagger')
  if(config.enabled){
    console.log('Plugin Swagger loaded...')
    fastify.register(FsSwagger, config.configuration)
  }else{
    console.log('Plugin Swagger disabled...')
  }
})


 