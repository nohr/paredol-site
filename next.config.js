/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    port: 1027,
  },
})