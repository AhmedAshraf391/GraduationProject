/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://mizan-grad-project.runasp.net/api/:path*',
        },
      ];
    },
  };
  
  export default nextConfig;
  