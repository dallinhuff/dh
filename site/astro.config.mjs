// @ts-check

import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://www.dallinhuff.com",

  redirects: {
    "/home": "/",

    "/github": "https://github.com/dallinhuff",
    "/linkedin": "https://linkedin.com/in/dallinhuff",
    "/instagram": "https://instagram.com/dallin.huff",
    "/discord": "https://discord.gg/3k9YS8qm",
  },

  integrations: [
    expressiveCode({
      themes: ["kanagawa-wave"],
    }),
    sitemap(),
  ],

  // Cloudflare adapter really doesn't play nice with vitest.
  // Since the only tests we have are for static/prerendered components,
  // just use the default/SSG adapter for unit tests.
  adapter: process.env.VITEST
    ? undefined
    : cloudflare({
        imageService: {
          build: "compile",
          runtime: "cloudflare-binding",
        },
      }),
});
