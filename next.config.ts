/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/valentines',
  assetPrefix: '/valentines/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
