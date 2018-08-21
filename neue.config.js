const proxy = require('koa-proxy')
const noCache = require('koa-no-cache')

module.exports = {
  plugins: {
    tokenSet: '@/plugins/tokenSet',
    interceptors: '@/plugins/interceptors',
    guards: '@/plugins/guards'
  },
  ssr: {
    server (app) {
      // map cookie token to auth header
      app.use(async (ctx, next) => {
        const { cookie } = ctx.request.header
        if (cookie) {
          const [ name, token ] = cookie.split('=')
          ctx.request.header.authorization = `Bearer ${token}`
        }
        await next()
      })
      // global nocache headers for service worker
      app.use(noCache({
        global: true
      }))
      // proxy api calls to separate backend
      app.use(proxy({
        host: 'http://localhost:3001',
        match: /\/api\//
      }))
    }
  }
}
