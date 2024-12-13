import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/predict',
        destination: 'https://capstone-wiradana.uc.r.appspot.com/predict',
      },
    ];
  },
};

export default nextConfig;
