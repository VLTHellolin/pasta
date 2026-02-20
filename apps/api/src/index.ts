import { serve } from '@hono/node-server';
import { env } from '@pasta/env';
import { createInstance } from './app';
import { logger } from './utils/logger';

const app = createInstance();

const main = () => {
  logger.info('Starting API server...');

  const port = env.PORT;
  const hostname = env.HOSTNAME;

  const server = serve({
    fetch: app.fetch,
    port,
    hostname,
  });
  process.title = 'Pasta api';
  process.on('SIGINT', () => {
    logger.info('Shutting down API server...');
    server.close();
    process.exit(130);
  });
  process.on('SIGTERM', () => {
    logger.info('Shutting down API server...');
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
