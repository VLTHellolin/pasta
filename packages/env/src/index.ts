import { z } from 'zod';

try {
  await import('dotenv/config');
} catch {
  // ignore for client
}

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),

  HOSTNAME: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.number().int().min(0).max(3).optional(),

  DATABASE_URL: z.url(),
  REDIS_URL: z.url().optional(),
  AUTH_SECRET: z.string().min(32),

  APP_NAME: z.string().default('Pasta'),
  APP_URL: z.url().default('http://localhost:3000'),
  DISABLE_SIGNUP: z.boolean().default(false),
});

export const env = EnvSchema.parse(process.env);
