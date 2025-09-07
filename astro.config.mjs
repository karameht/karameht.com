// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
  site: 'https://karameht.com',
  integrations: [mdx()],
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
  devToolbar: {
    enabled: false,
  },
});
