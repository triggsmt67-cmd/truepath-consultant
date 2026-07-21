import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'admin.truepath406.com',
      },
    ],
    // Serve modern image formats for smaller file sizes
    formats: ['image/avif', 'image/webp'],
    // Limit generated image sizes to what we actually use
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  // Enable gzip + brotli compression
  compress: true,
  // Strict mode for catching bugs
  reactStrictMode: true,
  // Optimize package imports for tree-shaking
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
