import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain static HTML on a CDN: no server, no cold starts.
  output: "export",
  // Images are pre-optimised by `npm run assets`, so the runtime optimiser
  // (which static export can't use anyway) is off.
  images: { unoptimized: true },
  poweredByHeader: false,
  // This app sits inside another app's repo; keep Turbopack from treating
  // the parent folder as the workspace root.
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
