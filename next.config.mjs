/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true,
        // serverComponentsExternalPackages: ['winston', 'winston-loki'],
      },
};

export default nextConfig;
