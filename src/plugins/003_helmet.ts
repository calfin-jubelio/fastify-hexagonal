/**
 * This plugins adds http documentation
 *
 * @see https://github.com/
 */

import fp from 'fastify-plugin';
import FsHelmet from '@fastify/helmet';
import XConfig from '@config';

export = fp(async function (fastify, _opts) {
  const config = XConfig.get('/plugins/helmet')
  if(config.enabled){
    console.log('Plugin Helmet loaded...')
    fastify.register(FsHelmet, config.configuration)
  }else{
    console.log('Plugin Helmet disabled...')
  }
})


 

