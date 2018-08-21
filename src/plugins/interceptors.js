import axios from 'axios'

export default async function ({ router, store, redirect }) {
  axios.defaults.baseURL = process.client ? '/api' : process.env.VUE_APP_API_URL + '/api'

  axios.interceptors.request
    .use((request) => {
      const { token } = store.getters
      if (token) {
        request.headers['Authorization'] = `Bearer ${token}`
      }
      return request
    })

  axios.interceptors.response
    .use((response) => {
      return response
    }, (error) => {
      if (error.response && error.response.status === 401) {
        const redirectPath = `/auth?redirect=${router.currentRoute}`
        store.commit('resetState')
        redirect(redirectPath)
      }
      store.commit('addError', error.response.data)
      setTimeout(() => store.commit('removeError'), 3000)
      return Promise.reject(error)
    })
}
