import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as actions from './actions'
import { mutations } from './mutations'

export const initialState = {
  token: null,
  currentUser: null
}
const getters = {
  token: state => state.token,
  currentUser: state => state.currentUser,
}
const plugins = []
if (process.client) {
  plugins.push(createLogger())
}

export default () => {
  return new Vuex.Store({
    state: initialState,
    getters,
    mutations,
    actions,
    plugins
  })
}
