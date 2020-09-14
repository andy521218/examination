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
  //普通用户
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
  //教师
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import('../components/main.vue'),
    children: [
      {
        path: '/teachercase',
        name: 'teachercase',
        component: () => import('../pages/teacher/teacherCase'),
      },
      {
        path: '/teacherclass',
        name: 'teacherclass',
        component: () => import('../pages/teacher/teacherClass'),
      },
      {
        path: '/teacherrelease',
        name: 'teacherrelease',
        component: () => import('../pages/teacher/teacherRelease'),
      },

      {
        path: '/teacherstatistics',
        name: 'teacherstatistics',
        component: () => import('../pages/teacher/teacherStatistics'),
      },
      {
        path: '/teacherstudent',
        name: 'teacherstudent',
        component: () => import('../pages/teacher/teacherStudent'),
      },
      {
        path: '/teachertuser',
        name: 'teachertuser',
        component: () => import('../pages/teacher/teacherUser'),
      },
    ]
  },
  //管理员
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../components/main.vue'),
    children: [
      {
        path: '/admincontent',
        name: 'admincontent',
        component: () => import('../pages/admin/adminContent'),
      },
      {
        path: '/adminlogo',
        name: 'adminlogo',
        component: () => import('../pages/admin/adminLogo'),
      },
      {
        path: '/adminnumber',
        name: 'adminnumber',
        component: () => import('../pages/admin/adminNumber'),
      },
      {
        path: '/adminorganization',
        name: 'adminorganization',
        component: () => import('../pages/admin/adminOrganization'),
      },
      {
        path: '/adminstatistics',
        name: 'adminstatistics',
        component: () => import('../pages/admin/adminStatistics'),
      },
      {
        path: '/adminteacher',
        name: 'adminteacher',
        component: () => import('../pages/admin/adminTeacher'),
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
