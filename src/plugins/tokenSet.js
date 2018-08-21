export default async function ({ store, ctx }) {
  if (!process.client) {
    if (ctx.headers.authorization) {
      const [ bearer, token ] = ctx.headers.authorization.split(' ')
      store.commit('setToken', token)
    }
  } else {
    const Cookies = require('js-cookie')
    store.commit('setToken', Cookies.get('token') || null)
  }
}
