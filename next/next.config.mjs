/** @type {import('next').NextConfig} */

import nextPWA from 'next-pwa';

const dev = process.env.NODE_ENV === 'development';

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: dev ? true : false,
  // 에러 페이지 이미지 precache (오프라인 대응)
  additionalManifestEntries: [
    { url: '/img/emotion/emotion1.png', revision: null }
  ],
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
});

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
  compiler: {
    styledComponents: true,
  },
};
export default withPWA(nextConfig);
