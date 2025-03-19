import type { NextConfig } from "next";
import path from "path";

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = withPWA({
  webpack: (config: any) => {
    config.resolve.alias["@fonts"] = path.join(__dirname, "public/fonts");
    return config;
  },
});

export default nextConfig;
