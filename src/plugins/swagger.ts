import fp from 'fastify-plugin';
import swagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';

import { version } from '../../package.json';

export default fp<FastifyDynamicSwaggerOptions>(async (fastify) => {
  fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Microservice Template',
        description: 'A microservice template using fastify and ViteJS',
        version
      },
      servers: [
        {
          url: 'http://localhost'
        }
      ]
    },
    hideUntagged: true,
    exposeRoute: true
  });
});
