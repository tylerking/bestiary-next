/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig