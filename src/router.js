import Router from 'vue-router'

export default () => {
  const router = new Router({
    mode: process.ssr ? 'history' : 'hash',

    routes: [
      {
        path: '/auth',
        name: 'auth',
        component: () => import('./views/Auth.vue'),
        meta: { guest: true }
      },
      {
        path: '/',
        name: 'welcome',
        component: () => import('./views/Welcome.vue'),
        meta: { requiresAuth: true }
      },
    ]
  })

  return router
}
