const withTM = require('next-transpile-modules')(['@shared/components'])

const moduleExports = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `/:path*`,
      },
    ]
  },
}

module.exports = withTM(moduleExports)
