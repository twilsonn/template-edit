/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  const withPWA = require("next-pwa")({
    dest: "public",
  });

  module.exports = withPWA({
    webpack: (config) => {
      config.resolve.fallback = { fs: false };
      return config;
    },
  });
} else {
  const nextConfig = {
    reactStrictMode: true,
  };

  module.exports = nextConfig;
}
