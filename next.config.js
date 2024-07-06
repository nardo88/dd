/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_HOST_API: process.env.NEXT_PUBLIC_HOST_API,
  },
}

module.exports = nextConfig
