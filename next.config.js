/** @type {import('next').NextConfig} */
// const withPlugins = require('next-compose-plugins');
const prod = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')({
  disable: prod ? false : true,
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
  async rewrites() {
    return [
      {
        destination: 'https://paredol.com/aite',
        source: '/info/aite/',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withPWA(nextConfig)