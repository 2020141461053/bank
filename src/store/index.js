import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    identity: [],
    token:[]
  },
  mutations: {
    initIdentity(state, data) {
      state.identity = data
    },
    login (state, data) {
      state.token = data
      sessionStorage.token = data
     // window.localStorage.setItem('username', JSON.stringify(data))
    },
    logout (state) {
      // 注意不能用 null 清除，否则将无法判断 user 里具体的内容
      state.token = ''
      state.identity=''
    }
  },
  actions: {
  }
})
