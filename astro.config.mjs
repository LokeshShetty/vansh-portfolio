import { defineConfig } from "astro/config";

export default defineConfig({
  // Plain static HTML on a CDN: no server, no cold starts.
  output: "static",
  build: {
    // CSS goes straight into the HTML, so nothing blocks the first paint.
    inlineStylesheets: "always",
  },
  vite: {
    // three.js is one deliberately lazy chunk (~130 KB gzipped); see Funnel.astro.
    build: { chunkSizeWarningLimit: 600 },
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: { avif: { quality: 50, effort: 6 }, webp: { quality: 72 } },
    },
  },
});
