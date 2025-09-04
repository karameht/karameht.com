// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://karameht.com",
  integrations: [mdx(), sitemap()],
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
  markdown: {
    shikiConfig: {
      theme: "aurora-x",
      wrap: true,
    },
  },
  devToolbar: {
    enabled: false,
  },
});
