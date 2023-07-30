import { createStore } from 'vuex'
import { State } from '@vue/runtime-core'

const store = createStore<State>({
  state() {
    return {
      isLogin: sessionStorage.getItem('token') !== null,
      role: sessionStorage.getItem('role') ? JSON.parse(sessionStorage.getItem('role')!) : [],
    }
  },
  mutations: {
    loadLoginStatue(state): void {
      state.isLogin = sessionStorage.getItem('token') !== null
      state.role = sessionStorage.getItem('role') ? JSON.parse(sessionStorage.getItem('role')!) : []
    },
  },
  getters: {
    getRole(state): string[] {
      return state.role
    },
    getIsLogin(state): boolean {
      return state.isLogin
    },
  },
})

export default store
