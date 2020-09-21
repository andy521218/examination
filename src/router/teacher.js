export const teacher=[{
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
  },]