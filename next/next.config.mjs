/** @type {import('next').NextConfig} */

import nextPWA from 'next-pwa';


const dev = process.env.NODE_ENV === 'development';

const withPWA = nextPWA({
  dest: 'public',
  register: false,
  skipWaiting: true,
  disable: dev,
  buildExcludes: [
    /app-build-manifest\.json$/,
  ],
  fallbacks: {
    document: '/offline',
  },
  additionalManifestEntries: [
    {
      url: '/offline',
      revision: '1',
    },
    {
      url: '/img/emotion/sad.png',
      revision: '1',
    },
  ],
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        networkTimeoutSeconds: 3,
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
};
export default withPWA(nextConfig);
