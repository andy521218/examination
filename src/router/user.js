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
]

export default user