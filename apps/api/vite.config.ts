import type { UserConfig } from 'vite';
import devServer from '@hono/vite-dev-server';
import tsconfigPaths from 'vite-tsconfig-paths';

export default {
  server: {
    port: 5000,
  },
  plugins: [
    tsconfigPaths(),
    devServer({
      entry: 'src/index.ts',
    }),
  ],
} satisfies UserConfig;
