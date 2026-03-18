/// <reference types="vitest" />
import { getViteConfig } from "astro/config";
import { loadEnv } from "vite";

export default getViteConfig({
  test: {
    env: loadEnv("", process.cwd(), ""),
  },
});
