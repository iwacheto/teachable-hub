/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_API_URL: process.env.BASE_API_URL,
    PREDICTMAN_API_URL: process.env.PREDICTMAN_API_URL,
    PREDICTMAN_API_KEY: process.env.PREDICTMAN_API_KEY,
    PREDICTMAN_API_KEY_W: process.env.PREDICTMAN_API_KEY_W,
  },
  images: {
    domains: [
      'avatars.dicebear.com',
    ],
  },
}

module.exports = nextConfig
