import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/home.vue'),
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../pages/index'),
      },
    ]
  },
  {
    path: '/usercore',
    name: 'usercore',
    component: () => import('../components/main.vue'),
    children: [
      {
        path: '/userachievement',
        name: 'userachievement',
        component: () => import('../pages/usercore/userAchievement'),
      },
      {
        path: '/usercenter',
        name: 'usercenter',
        component: () => import('../pages/usercore/userCenter'),
      },
      {
        path: '/userpassword',
        name: 'userpassword',
        component: () => import('../pages/usercore/userPassword'),
      },
    
      {
        path: '/userrecord',
        name: 'userrecord',
        component: () => import('../pages/usercore/userRecord'),
      },
      {
        path: '/userstatistics',
        name: 'userstatistics',
        component: () => import('../pages/usercore/userStatistics'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
