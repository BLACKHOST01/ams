import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
module.exports = {
  eslint: {
    // Disable ESLint entirely
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Also disable TypeScript ESLint if needed
    ignoreBuildErrors: true,
  },
}