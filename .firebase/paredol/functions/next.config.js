"use strict";

// next.config.js
var nextConfig = {
  experimental: {
    appDir: true
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    port: 1027
  }
};
module.exports = nextConfig;
