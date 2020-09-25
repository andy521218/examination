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
    component:home,
    children: [
      {
        path: '/admincontent',
        name: 'admincontent',
        components:{
          main:() => import('../pages/admin/adminContent'),
        },
        children:[
          {
            path:'/adminhear',
            name:'adminhear',
           component:()=>import('../pages/admin/adminCont/hear')
          },
          {
            path:'/adminlook',
            name:'adminlook',
           component:()=>import('../pages/admin/adminCont/look')
          },
          {
            path:'/adminname',
            name:'adminname',
           component:()=>import('../pages/admin/adminCont/name')
          },
          {
            path:'/adminprescription',
            name:'adminprescription',
           component:()=>import('../pages/admin/adminCont/prescription')
          },
          {
            path:'/adminpulse',
            name:'adminpulse',
           component:()=>import('../pages/admin/adminCont/pulse')
          },
          {
            path:'/admintreatment',
            name:'admintreatment',
           component:()=>import('../pages/admin/adminCont/treatment')
          }
        ]
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
 },
 //案例管理
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
   ]
 }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
