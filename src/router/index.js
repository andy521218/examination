import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import( '../views/login')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import( '../views/home.vue'),
    redirect: '/index',
    children: [
      {
          path: '/index',
          name: 'index',
          component: () => import('../pages/index'), 
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
