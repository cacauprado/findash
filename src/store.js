import Vue from 'vue'
import Vuex from 'vuex'
import categories from './store/modules/categories'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: null,
  },
  mutations: {
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
  },
  actions: {
  },
  modules: {
    categories,
  },
})
