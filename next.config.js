/** @type {import('next').NextConfig} */
// const withPlugins = require('next-compose-plugins');

const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === "development",
  dest: 'public'
})

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

const nextConfig = {
  experimental: {
    appDir: true,
    // runtime: 'experimental-edge',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withPWA(nextConfig)