import Vue from 'vue'
import Router from 'vue-router'

import RwvHome from '@/views/Home'
import RwvLogin from '@/views/Login'
import RwvRegister from '@/views/Register'
import RwvProfile from '@/views/ProfileGlobal'
import RwvSettings from '@/views/Settings'
import About from '@/views/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: RwvHome,
      children: [
        // {
        //   path: '',
        //   name: 'home',
        //   component: RwvHomeGlobal
        // }
        // {
        //   path: 'my-feed',
        //   name: 'home-my-feed',
        //   component: RwvHomeMyFeed
        // },
        // {
        //   path: 'tag/:tag',
        //   name: 'home-tag',
        //   component: RwvHomeTag
        // }
      ]
    },
    {
      name: 'about',
      path: '/about',
      component: About
    },
    {
      name: 'login',
      path: '/login',
      component: RwvLogin
    },
    {
      name: 'register',
      path: '/register',
      component: RwvRegister
    },
    {
      name: 'settings',
      path: '/settings',
      component: RwvSettings
    },
    // Handle child routes with a default, by giving the name to the
    // child.
    // SO: https://github.com/vuejs/vue-router/issues/777
    {
      path: '/@:username',
      name: 'profile',
      component: RwvProfile,
    }
  ]
})
