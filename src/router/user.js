import home from '../views/home'

export const user=[{
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
]

export default user