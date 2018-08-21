import Vue from 'vue'
import Buefy from 'buefy'
import VueTimeago from 'vue-timeago'
import VueClipboard from 'v-clipboard'
import { loadProgressBar } from 'axios-progress-bar'
import tokenOrRedirect from './middlewares/tokenOrRedirect'
import App from './App.vue'

import '@mdi/font/css/materialdesignicons.css'
import 'axios-progress-bar/dist/nprogress.css'

if (process.client) {
  require('./registerServiceWorker')
  loadProgressBar()
}

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(VueTimeago)
Vue.use(VueClipboard)

export default function ({ app, router, store, ctx }) {
  return new Vue({
    router,
    store,
    middlewares: [ tokenOrRedirect ],
    render: h => h(App)
  })
}
