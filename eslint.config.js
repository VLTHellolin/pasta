import defineConfig from '@hellolin-eslint/config';

export default defineConfig({
  env: {
    browser: true,
    node: true,
  },
  react: true,
  node: false, // temporary fix
});
