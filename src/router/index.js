import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home'

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
    component: home,
    children: [
      {
        path: '/index',
        name:"index",
        components: {
          index: ()=>import('../pages/index'),      
        }
      },
    ]
  },
  //普通用户
  {
    path: '/usercore',
    name: 'usercore',
    component:home,
    children: [
      {
        path: '/userachievement',
        name: 'userachievement',
        components:{
          main:() => import('../pages/usercore/userAchievement'),
        } 
      },
      {
        path: '/usercenter',
        name: 'usercenter',
        components:{
          main:() => import('../pages/usercore/userCenter'),
        } 
      },
      {
        path: '/userpassword',
        name: 'userpassword',
        components:{
          main:() => import('../pages/usercore/userPassword'),
        } 
      },

      {
        path: '/userrecord',
        name: 'userrecord',
        components:{
          main:() => import('../pages/usercore/userRecord'),
        } 
      },
      {
        path: '/userstatistics',
        name: 'userstatistics',
        components:{
          main:() => import('../pages/usercore/userStatistics'),
        } 
      },
    ]
  },
  //教师 
  {
    path: '/teacher',
    name: 'teacher',
    component: home,
    children: [
      {
        path: '/teachercase',
        name: 'teachercase',
        components:{
          main:() => import('../pages/teacher/teacherCase'),
        },
      },
      {
        path: '/teacherclass',
        name: 'teacherclass',
        components:{
          main:() => import('../pages/teacher/teacherClass'),
        },
      },
      {
        path: '/teacherrelease',
        name: 'teacherrelease',
        components:{
          main:() => import('../pages/teacher/teacherRelease'),
        },
      },

      {
        path: '/teacherstatistics',
        name: 'teacherstatistics',
        components:{
          main:() => import('../pages/teacher/teacherStatistics'),
        },
      },
      {
        path: '/teacherstudent',
        name: 'teacherstudent',
        components:{
          main:() => import('../pages/teacher/teacherStudent'),
        },
      },
      {
        path: '/teacheruser',
        name: 'teacheruser',
        components:{
          main:() => import('../pages/teacher/teacherUser'),
        },
      },
    ]
  },
  //管理员
  {
    path: '/admin',
    name: 'admin',
    // component: ()=>import('../pages/admin/adminIndex'),
  component:home,
    children: [
      {
        path: '/admincontent',
        name: 'admincontent',
        components:{
          main:() => import('../pages/admin/adminContent'),
        },
      },
      {
        path: '/adminlogo',
        name: 'adminlogo',
        components: {main:() => import('../pages/admin/adminLogo')},
      },
      {
        path: '/adminnumber',
        name: 'adminnumber',
        components: {main:() => import('../pages/admin/adminNumber')},
      },
      {
        path: '/adminorganization',
        name: 'adminorganization',
        components: {main:() => import('../pages/admin/adminOrganization')},
      },
      {
        path: '/adminstatistics',
        name: 'adminstatistics',
        components: {main:() => import('../pages/admin/adminStatistics')},
      },
      {
        path: '/adminmaster',
        name: 'adminmaster',
        components: {main:() => import('../pages/admin/adminTeacher')},
      },
    ]
  },
 //message
 {
   path:'/message',
   name:'message',
   component:home,
   redirect:'messageforum',
   children:[
      {
        path: '/messageforum',
        name: 'messageforum',
        components:{
          main:() => import('../pages/message/messageForum'),
        },
      },
      {
        path: '/messagemy',
        name: 'messagemy',
        components:{
          main:() => import('../pages/message/messageMy'),
        },
      },
      {
        path: '/messageprivate',
        name: 'messageprivate',
        components:{
          main:() => import('../pages/message/messagePrivate'),
        },
      },
      {
        path: '/messagePublish',
        name: 'messagepublish',
        components:{
          main:() => import('../pages/message/messagePublish'),
        },
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
