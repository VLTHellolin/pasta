import type { UserConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import react from '@vitejs/plugin-react';
import unocss from 'unocss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default {
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    tsconfigPaths(),
    unocss(),
    react(),
    reactRouter(),
  ],
} satisfies UserConfig;
