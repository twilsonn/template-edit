/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
});
