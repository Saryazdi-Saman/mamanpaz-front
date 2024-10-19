/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['winston', 'winston-loki'],
      },
};

export default nextConfig;
