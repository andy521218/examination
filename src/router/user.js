import home from '../views/home'

export const user=[
{
  path: '/home',
  name: 'home',
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
      path: '/index',
      name:"index",
      components: {
        index: ()=>import('../pages/index'),      
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
{
  path: '/casehome',
  name: 'casehome',
  component:() => import('../pages/usercore/case/caseHome'),
},
{
  path:'index',
  name:'index',
  redirect: "userask",
  component:()=>import('../pages/teacher/edit/index'),
  children:[
    {
      path: '/userlook',
      name: 'userlook',
      component:() => import('../pages/usercore/case/userLook'),
    },
    {
      path: '/userask',
      name: 'userlookuserlookuserlookuserlook',
      component:() => import('../pages/usercore/case/userAsk'),
    },
    {
      path: '/userHear',
      name: 'userHear',
      component:() => import('../pages/usercore/case/userHear'),
    },
    {
      path: '/usercut',
      name: 'usercut',
      component:() => import('../pages/usercore/case/userCut'),
    },
    {
      path: '/userdialectical',
      name: 'userdialectical',
      component:() => import('../pages/usercore/case/userDialectical'),
    },
    {
      path: '/usertreatment',
      name: 'usertreatment',
      component:() => import('../pages/usercore/case/userTreatment'),
    },
  ]
},
]

export default user