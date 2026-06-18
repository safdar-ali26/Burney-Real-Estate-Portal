import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "reelly-backend.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "offplan-uploads-prod.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "api.reelly.io",
      },
    ],
  },
};

export default nextConfig;