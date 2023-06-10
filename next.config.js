/** @type {import('next').NextConfig} */
require('dotenv').config();
module.exports = {
  env: {
    NEXT_PUBLIC_NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_NEXT_PUBLIC_API_URL,
  },
};
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
