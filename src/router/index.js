import Vue from 'vue'
import VueRouter from 'vue-router'
// import home from '../views/home'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path:'/case',
    name:'case',
    component:()=>import('../pages/teacher/edit/index'),
    redirect: "editlook",
    children:[
      {
        path:'/editlook',
        name:'/editlook',
        component:()=>import('../pages/teacher/edit/editLook')
      },
      {
       path:'/edithear',
       name:'/edithear',
       component:()=>import('../pages/teacher/edit/editHear')
     },
     {
       path:'/editask',
       name:'/editask',
       component:()=>import('../pages/teacher/edit/editAsk')
     },
     {
       path:'/editcut',
       name:'/editcut',
       component:()=>import('../pages/teacher/edit/editCut')
     },
     {
       path:'/editdialectical',
       name:'/editdialectical',
       component:()=>import('../pages/teacher/edit/editDialectical')
     },
     {
      path:'/edittreatment',
      name:'/edittreatment',
      component:()=>import('../pages/teacher/edit/editTreatment')
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
