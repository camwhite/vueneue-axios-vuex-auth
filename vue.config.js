const proxy = require('koa-proxy')

module.exports = {
  pluginOptions: {
    generate: {
      scanRouter: true,
      params: {},
      paths: []
    }
  },
  pwa: {
    workboxOptions: {
      runtimeCaching: [{
        urlPattern: new RegExp('/api'),
        handler: 'networkFirst'
      }],
      templatedUrls: {
        '/': 'index.ssr.html'
      }
    }
  }
}
