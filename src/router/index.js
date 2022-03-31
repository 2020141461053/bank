import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件

import Login from "../components/Login/Login";
import Home from "../components/Home";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
      {
      path: '/login',
      name: 'Login',
      component: Login
    },
    { path: '/',
      name: 'Default',
      redirect: '/login',
     },
      {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/show',
      children: [

        {
          path:'/upload',
          name:'upload',
          component:()=>import('../components/upload/upload'),
          meta: {
            requireAuth: true
          },
        },
        {
          path:'/show',
          name:'Production',
          component:()=>import('../components/show/Production'),
          meta: {
            requireAuth: true
          },


       }
      ]
    }
  ]
})

