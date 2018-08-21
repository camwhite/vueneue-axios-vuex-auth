import { signup, signin, get, post, put, del } from './api'

export const onHttpRequest = async (store, { route, redirect, ctx }) => {
  // When route requires auth
  if (route.meta.requiresAuth) {
    try {
      await store.dispatch('getCurrentUser') // dispatch the the getCurrentUser action
    } catch (err) {
      // Here I have to catch the error for redirect
      // I am wanting to do it in src/plugins/interceptors.js
      const redirectPath = `/auth?redirect=${route.path}`
      store.commit('resetState')
      redirect(redirectPath)
    }
  }
}

export const signupUser = async ({ commit }, payload) => {
  const { currentUser, token } = await signup(payload)
  if (process.client) {  // if on client plant cookie token
    const Cookies = require('js-cookie')
    Cookies.set('token', token)
  }
  // set API response into store
  commit('setToken', token)
  commit('setCurrentUser', currentUser)
}

export const signinUser = async ({ commit }, payload) => {
  const { currentUser, token } = await signin(payload)
  if (process.client) {  // if on client plant cookie token
    const Cookies = require('js-cookie')
    Cookies.set('token', token)
  }
  // set API response into store
  commit('setToken', token)
  commit('setCurrentUser', currentUser)
}

export const getCurrentUser = async ({ commit, state }) => {
  const currentUser = await get('users/me')
  // set API response into store
  commit('setCurrentUser', currentUser)
}
