import type { HonoEnv } from '../../types';
import { Hono } from 'hono';
import { auth } from './service';

export const authRouter = new Hono<HonoEnv>()
  .use(async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (session) {
      c.set('user', session.user);
      c.set('session', session.session);
    } else {
      c.set('user', null);
      c.set('session', null);
    }

    await next();
  })
  .on(['GET', 'POST'], '/*', c => {
    return auth.handler(c.req.raw);
  });
