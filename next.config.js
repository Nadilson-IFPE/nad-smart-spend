/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    NEXT_PUBLIC_MONGODB_URL: process.env.NEXT_PUBLIC_MONGODB_URL,
  },
};

module.exports = nextConfig;
