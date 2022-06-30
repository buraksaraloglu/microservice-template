import { join } from 'path';
import * as fastify from 'fastify';
import autoLoad from '@fastify/autoload';
import cors from '@fastify/cors';
import { config } from 'dotenv';
config();

const app = fastify.default({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        destination: 1,
        colorize: true,
        translateTime: 'HH:MM:ss.l',
        ignore: 'pid,hostname'
      }
    }
  }
});

// TODO: This is a bad practice, fix origin later
app.register(cors, {
  origin: '*'
});

app.register(autoLoad, {
  dir: join(__dirname, 'plugins')
});

app.register(autoLoad, {
  dir: join(__dirname, 'routes')
});

const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await app.listen({
      port: typeof port === 'string' ? parseInt(port) : port,
      host: process.env.HOST || '0.0.0.0'
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

export default app;
