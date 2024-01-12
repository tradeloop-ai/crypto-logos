/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.generated.photos',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 's2.coinmarketcap.com',
        port: '',
        pathname: '**'
      }
    ]
  }
}

module.exports = nextConfig
