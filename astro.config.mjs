import { defineConfig } from "astro/config";

// Absolute URLs (the share image needs one). Set SITE_URL for a custom
// domain; on Vercel the production domain is picked up automatically.
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  undefined;

export default defineConfig({
  site,
  // Plain static HTML on a CDN: no server, no cold starts.
  output: "static",
  build: {
    // CSS goes straight into the HTML, so nothing blocks the first paint.
    inlineStylesheets: "always",
  },
  vite: {
    // three.js is one deliberately lazy chunk (~130 KB gzipped); see Funnel.astro.
    build: {
      chunkSizeWarningLimit: 600,
      // lightningcss folds animation-timeline into the animation shorthand,
      // which browsers reject, silently disabling every scroll animation.
      // esbuild keeps the longhand.
      cssMinify: "esbuild",
    },
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: { avif: { quality: 50, effort: 6 }, webp: { quality: 72 } },
    },
  },
});
