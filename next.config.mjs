/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['gateway.pinata.cloud', 'api.openai.com'],
  },
};

export default nextConfig;
