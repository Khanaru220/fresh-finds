/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/app',
        destination: '/app/foods',
        permanent: true
      },
      {
        source: '/app/foods',
        destination: '/app/foods/produce',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
