/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')({
  disable: prod ? false : true,
  dest: 'public'
})

module.exports = withPWA({
  experimental: {
    appDir: true,
    runtime: 'experimental-edge',
  },
  reactStrictMode: true,
  swcMinify: true,
})