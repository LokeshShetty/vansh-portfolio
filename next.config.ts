import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain static HTML on a CDN: no server, no cold starts.
  output: "export",
  // Images are pre-optimised by `npm run assets`, so the runtime optimiser
  // (which static export can't use anyway) is off.
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
