import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // AVIF first (smallest), WebP fallback. Both are generated once and cached.
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 80],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 160, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
}

export default nextConfig
