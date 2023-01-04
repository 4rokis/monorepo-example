const {
  DOCS_URL = 'http://localhost:3001',
  STORE_URL = 'http://localhost:3002',
} = process.env

module.exports = {
  transpilePackages: ['@shared/components'],
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `/:path*`,
      },
      // Docs
      {
        source: '/docs',
        destination: `${DOCS_URL}/docs`,
      },
      {
        source: '/docs/:path*',
        destination: `${DOCS_URL}/docs/:path*`,
      },
      // Store
      {
        source: '/store',
        destination: `${STORE_URL}/store`,
      },
      {
        source: '/store/:path*',
        destination: `${STORE_URL}/store/:path*`,
      },
    ]
  },
}
