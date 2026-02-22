import type { HonoEnv } from './types';
import { Hono } from 'hono';
import { contextStorage } from 'hono/context-storage';
import { cors } from 'hono/cors';
import { logger as honoLogger } from 'hono/logger';
import { authRouter } from './modules/auth';
import { pastaRouter } from './modules/pasta';
import { logger } from './utils/logger';

export const createApiInstance = () => {
  const api = new Hono<HonoEnv>()
    .use(contextStorage())
    .use(honoLogger(logger.info.bind(logger)))
    .use(cors({
      origin: origin => origin || '*',
      allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      exposeHeaders: ['Content-Length'],
      maxAge: 1200,
      credentials: true,
    }))
    .route('/auth', authRouter)
    .route('/pasta', pastaRouter);

  return api;
};

export type ApiType = ReturnType<typeof createApiInstance>;
