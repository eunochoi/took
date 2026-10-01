/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '55mb',
    },
  },
  images: {
    domains: [
      'axajzftmwrmj.compat.objectstorage.ap-chuncheon-1.oraclecloud.com',
    ],
  },
};
export default nextConfig;
