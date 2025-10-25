import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopack: {
      // This tells Turbopack where the project root is.
      // `process.cwd()` resolves to the directory where you run the `next` command.
      rootDir: process.cwd(),
    },
  },
};

export default nextConfig;
