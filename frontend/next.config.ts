import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  images: {
    remotePatterns: [
      // Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },

      // Google Profile Images
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },

      // Google Alternate Profile Images
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },

      // Reelly CRM
      {
        protocol: "https",
        hostname: "reelly-backend.s3.amazonaws.com",
      },

      // Off Plan Images
      {
        protocol: "https",
        hostname: "offplan-uploads-prod.s3.ap-south-1.amazonaws.com",
      },

      // Reelly API Images
      {
        protocol: "https",
        hostname: "api.reelly.io",
      },

      // Google User Content (covers various Google image URLs)
      {
        protocol: "https",
        hostname: "googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;