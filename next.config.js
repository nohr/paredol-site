/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const prod = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')({
  disable: prod ? false : true,
  dest: 'public'
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  experimental: {
    appDir: true,
    enableUndici: true,
    runtime: 'experimental-edge',
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withPlugins([withBundleAnalyzer, withPWA], nextConfig)