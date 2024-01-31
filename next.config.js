/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  cleanDistDir: true,
  experimental: {
    optimizeServerReact: false,
    taint: true,
  },
};

module.exports = nextConfig;
