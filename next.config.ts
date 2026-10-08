import type { NextConfig } from "next";

const rawBackendUrl =
  process.env.BACKEND_URL || "https://cltkkzd0-5000.inc1.devtunnels.ms";
const backendUrl = rawBackendUrl.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "roofin-backend.ambrhomes.work.gd",
      },
      {
        protocol: "https",
        hostname: "cltkkzd0-5000.inc1.devtunnels.ms",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendUrl}/api/v1/:path*`,
      },
      {
        source: "/uploads/:path*",
        destination: `${backendUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
