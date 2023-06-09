import 'module-alias/register'
import * as Server from '@/server'; 
import * as Utils from '@/utilities';
import XConfig from '@config';

Server.build()
  .then(app => {
    app.listen({
      port: 3000,
      host: '0.0.0.0'
    }, (err, address) => {
        if (err) throw err
        // Server is now listening on ${address}
        const config = XConfig.get('/plugins/swagger')
        if(config.enabled){
            app.swagger()
        }
       
        const exitHandler = Utils.terminate(app, {
          coredump: false,
          timeout: 500
        }) 

        process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
        process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
        process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
        process.on('SIGINT', exitHandler(0, 'SIGINT'))
    }) 
  })
  .catch(err => console.log(err))
