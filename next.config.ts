import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // permite todos los hosts HTTPS
      },
      {
        protocol: 'http',
        hostname: '**', // opcional si usas HTTP
      },
    ],
  },
};

export default nextConfig;
