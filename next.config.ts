import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const STRAPI_PROTOCOL = (process.env.NEXT_PUBLIC_STRAPI_PROTOCOL || 'http') as
  | 'http'
  | 'https';
const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST || 'localhost';
const STRAPI_PORT = process.env.NEXT_PUBLIC_STRAPI_PORT || '1337';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: STRAPI_PROTOCOL,
        hostname: STRAPI_HOST,
        port: STRAPI_PORT,
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cms-aw1k.onrender.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
