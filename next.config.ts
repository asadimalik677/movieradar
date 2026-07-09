import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "commons.wikimedia.org"
      },
      {
        protocol: "http",
        hostname: "commons.wikimedia.org"
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org"
      },
      {
        protocol: "http",
        hostname: "upload.wikimedia.org"
      },
      {
        protocol: "https",
        hostname: "**.wikimedia.org"
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org"
      }
    ]
  },
  trailingSlash: true
};

export default nextConfig;

