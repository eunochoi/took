/** @type {import('next').NextConfig} */

import nextPWA from 'next-pwa';


const dev = process.env.NODE_ENV === 'development';

const withPWA = nextPWA({
  dest: 'public',
  register: false,
  skipWaiting: true,
  cacheStartUrl: false,
  dynamicStartUrl: false,
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
      // Page navigations may contain account-specific HTML. Always ask the
      // server for the current response; next-pwa supplies /offline only when
      // the network request fails and the browser is offline.
      urlPattern: ({ request }) => request.mode === 'navigate',
      handler: 'NetworkOnly',
      options: {},
    },
    {
      // GET API responses can contain private user data. They must never be
      // stored in the Service Worker runtime cache.
      urlPattern: ({ url }) => {
        return url.origin === self.origin && url.pathname.startsWith('/api/');
      },
      handler: 'NetworkOnly',
      method: 'GET',
      options: {},
    },
    {
      // Server Actions are POST requests. Keep them explicitly network-only
      // so their responses cannot become PWA runtime-cache entries.
      urlPattern: ({ url }) => url.origin === self.origin,
      handler: 'NetworkOnly',
      method: 'POST',
      options: {},
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
