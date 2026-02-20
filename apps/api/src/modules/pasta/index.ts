import type { HonoEnv } from '../../types';
import { Hono } from 'hono';

export const pastaRouter = new Hono<HonoEnv>();
