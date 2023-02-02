/** @type {import('next').NextConfig} */

const nextConfig = { 
  reactStrictMode: true, 
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: 'www.movienewz.com',
        port: '',
        pathname: '/img/films/**',
      },
    ],
  },
}

module.exports = nextConfig
