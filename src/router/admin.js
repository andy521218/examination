export const admin =[ {
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
        path: '/adminmaster',
        name: 'adminmaster',
        component: () => import('../pages/admin/adminTeacher'),
      },
    ]
  },]

  export default admin;