import { defineWranglerConfig } from "wrangler/experimental-config";

// cf's build step for a static site: where the built pages are (npm run build writes them).
export default defineWranglerConfig({
  assetsDirectory: "dist",
});
