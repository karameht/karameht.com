// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  site: 'https://karameht.com',
  integrations: [mdx(), ...(isDev ? [react()] : [])],
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
