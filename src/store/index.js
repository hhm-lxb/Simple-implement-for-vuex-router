import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  },
  mutations: {
    addCount (state) {
      state.count++
    }
  },
  actions: {
    addCount ({ commit }) {
      setTimeout(() => {
        commit('addCount')
      }, 4000)
    }
  }
})