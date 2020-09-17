export const user=[{
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