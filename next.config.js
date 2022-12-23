/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')({
  disable: prod ? false : true,
  dest: 'public'
})

const nextConfig = withPWA({
  experimental: {
    appDir: true,
    runtime: 'experimental-edge',
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
      minify: false,
    },
  },
})

module.exports = nextConfig