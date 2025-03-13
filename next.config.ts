import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias["@fonts"] = path.join(__dirname, "public/fonts");
    return config;
  },
};

export default nextConfig;
