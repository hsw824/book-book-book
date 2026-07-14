import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'search*.kakaocdn.net',
        pathname: '/thumb/**',
      },
    ],
  },
};

export default nextConfig;
