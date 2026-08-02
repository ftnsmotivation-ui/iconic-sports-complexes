import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingIncludes: {
    '/api/export/*': ['./node_modules/@img/**/*'],
  },
};

export default nextConfig;
