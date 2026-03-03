import { serve } from '@hono/node-server';
import { api } from '@pasta/api';
import { env } from '@pasta/env';
import { Logger } from '@pasta/logger';
import { Hono } from 'hono';
import { createRequestHandler } from 'react-router';

export const main = () => {
  const logger = new Logger({ tags: ['server'] });

  const webHandler = createRequestHandler((): any => {}, 'production'); // placeholder
  const app = new Hono()
    .route('/api', api)
    .all('*', c => webHandler(c.req.raw));

  const hostname = env.HOSTNAME;
  const port = env.PORT;

  logger.info('Starting server...');
  const server = serve({
    fetch: app.fetch,
    hostname,
    port,
  });
  process.title = 'Pasta';
  process.on('SIGINT', () => {
    logger.info('Shutting down server...');
    server.close();
    process.exit(130);
  });
  process.on('SIGTERM', () => {
    logger.info('Shutting down server...');
    server.close(err => {
      if (err) {
        logger.error('Error during server shutdown:', err);
        process.exit(1);
      }
    });
    process.exit(143);
  });

  logger.info(`Server is running on http://${hostname}:${port}`);
};

main();
