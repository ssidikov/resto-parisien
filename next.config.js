/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },

  // Environment variables validation
  env: {
    CUSTOM_BUILD_TIME: new Date().toISOString(),
  },

  // Production optimizations
  compress: true,
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '3000',
      },
    ],
    formats: ['image/webp', 'image/avif'],  },  
  // Ensure SWC is used for better performance
  swcMinify: true,
}

module.exports = nextConfig