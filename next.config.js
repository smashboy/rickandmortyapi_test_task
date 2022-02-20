/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["pages", "utils", "core", "integrations"],
  },
  experimental: {
    reactRoot: true,
  },
};

module.exports = nextConfig;
