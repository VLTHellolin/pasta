import type { UserConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import react from '@vitejs/plugin-react';
import unocss from 'unocss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default {
  plugins: [
    tsconfigPaths(),
    unocss(),
    react(),
    reactRouter(),
  ],
} satisfies UserConfig;
