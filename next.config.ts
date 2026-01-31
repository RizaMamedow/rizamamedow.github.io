import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/krugleshock',
  assetPrefix: '/krugleshock/',
};

export default nextConfig;
