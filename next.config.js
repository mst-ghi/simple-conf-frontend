/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  cleanDistDir: true,
  experimental: {
    optimizeServerReact: false,
  },
};

module.exports = nextConfig;
