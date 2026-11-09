import { defineConfig } from "cf/config";

// A static site: no Worker code, only the built dist/ folder (wrangler.config.ts names it), served at docs.nimstead.systems.
export default defineConfig({
  worker: {
    name: "nimstead-docs",
    compatibilityDate: "2026-11-09",
    assets: {
      notFoundHandling: "404-page", // dist/404.html
    },
    domains: ["docs.nimstead.systems"],
    workersDev: false, // only the custom domain serves it
  },
});
