
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // Add experimental features here if needed in the future
  },
  allowedDevOrigins: [
    'https://*.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev',
  ],
};

export default nextConfig;
