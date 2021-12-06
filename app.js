'use strict';
const hapi = require('@hapi/hapi')
const morgan = require('morgan')

const init = async()=>{
    const server = hapi.server({
        port : 8000,
        host : 'localhost'
    });


    // server.route({
    //     method : 'GET',
    //     path: '/',
    //     handler : (request,h)=>{
    //         return 'First hapi Server'
    //     }
    // })
    server.route(require('./routes/userRoute'));

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
}

process.on('unhandledRejection',(err)=>{
    console.log(err);
    process.exit(1);
});

init();





