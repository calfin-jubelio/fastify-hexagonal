/**
 * This plugins adds http documentation
 *
 * @see https://github.com/
 */

import fp from 'fastify-plugin';
import { JsonschemaValidator } from '@/utilities';
import XConfig from '@config';

export = fp(async function (fastify, _opts) {
  const config = XConfig.get('/plugins/validatorCompiler')
  if(config.enabled){
    console.log('Plugin Validator Compiler loaded...')
    fastify.setValidatorCompiler(({ schema, method, url, httpPart }) =>
      JsonschemaValidator.compile(schema)
    );
  }else{
    console.log('Plugin Validator Compiler disabled...')
  }
})


 