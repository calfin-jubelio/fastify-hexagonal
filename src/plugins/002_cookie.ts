/**
 * This plugins adds http documentation
 *
 * @see https://github.com/
 */

import fp from 'fastify-plugin';
import type { FastifyCookieOptions } from '@fastify/cookie';
import FsCookie from '@fastify/cookie';
import XConfig from '@config';

export = fp(async function (fastify, _opts) {
  const config = XConfig.get('/plugins/cors')
  if(config.enabled){
    fastify.register(FsCookie, config.configuration as FastifyCookieOptions)
    console.log('Plugin Cookie loaded...')
  }else{
    console.log('Plugin Cookie disabled...')
  }
})


 

