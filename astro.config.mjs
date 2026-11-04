import { defineConfig } from 'astro/config';
export default defineConfig({
  site: process.env.SITE_URL || 'https://wmuzhonghua.github.io',
  base: process.env.BASE_PATH || '/',
  devToolbar: { enabled: false },
  trailingSlash: 'always',
});
