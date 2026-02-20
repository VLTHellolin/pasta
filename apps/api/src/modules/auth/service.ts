import { db } from '@pasta/db';
import * as authSchema from '@pasta/db/schema/users';
import { env } from '@pasta/env';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { emailOTP, haveIBeenPwned, lastLoginMethod } from 'better-auth/plugins';
import { logger } from '../../utils/logger';

export const auth = betterAuth({
  appName: env.APP_NAME,
  baseURL: env.APP_URL,
  secret: env.AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    disableSignUp: env.DISABLE_SIGNUP,
  },
  plugins: [
    haveIBeenPwned(),
    lastLoginMethod(),
    emailOTP({
      sendVerificationOnSignUp: true,
      overrideDefaultEmailVerification: true,
      sendVerificationOTP: async () => {}, // TODO
    }),
  ],
  logger: {
    log: (level, msg, ...args) => {
      logger[level](msg, ...args);
    },
  },
  telemetry: {
    enabled: false,
  },
});
