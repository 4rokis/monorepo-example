
const { DOCS_URL = 'http://localhost:3001' } = process.env

module.exports = {
  transpilePackages: ['@shared/components'],
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `/:path*`,
      },
      {
        source: '/docs',
        destination: `${DOCS_URL}/docs`,
      },
      {
        source: '/docs/:path*',
        destination: `${DOCS_URL}/docs/:path*`,
      },
    ]
  },
}
