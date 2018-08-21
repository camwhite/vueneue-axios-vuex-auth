import { initialState } from '../store'

export const mutations = {
  resetState (state) {
    state = initialState
  },
  setToken (state, token) {
    state.token = token
  },
  setCurrentUser (state, currentUser) {
    state.currentUser = currentUser
  }
}
