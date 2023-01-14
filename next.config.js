/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  styledComponents: true,
  swcMinify: false,
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
