// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL || "http://localhost:4321",
  integrations: [sitemap()],
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
  devToolbar: {
    enabled: false,
  },
});
