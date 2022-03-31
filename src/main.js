import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import draggable from 'vuedraggable'

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8444'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
axios.defaults.withCredentials =true
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  draggable,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
      if (store.state.token) {
        next()
      } else {
        next({
          path: 'login',
          query: {redirect: to.fullPath}
        })
      }
    }
    else {
      next()
    }
  }
)

