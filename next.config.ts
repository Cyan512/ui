import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const STRAPI_PROTOCOL = (process.env.NEXT_PUBLIC_STRAPI_PROTOCOL || 'http') as
  | 'http'
  | 'https';
const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST || 'localhost';
const STRAPI_PORT = process.env.NEXT_PUBLIC_STRAPI_PORT || '1337';

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: STRAPI_PROTOCOL,
        hostname: STRAPI_HOST,
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cms-aw1k.onrender.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'strapi.hostal-korikallpa.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
export default withNextIntl(nextConfig);
