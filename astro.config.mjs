// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://www.dallinhuff.com",
  markdown: {
    shikiConfig: {
      theme: "kanagawa-wave",
    },
  },
});
