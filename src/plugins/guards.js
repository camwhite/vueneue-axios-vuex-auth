import axios from 'axios'

export default async function ({ router, store }) {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && process.client) {
      if (!store.getters.token) {
        next('/auth')
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.guest) && process.client) {
      if (store.getters.token) {
        next('/')
      } else {
        next()
      }
    } else {
      next()
    }
  })
}
