import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ant-design:setting-outlined',
      keepAlive: true,
      order: 100,
      title: '系统管理',
      authority: ['System'],
    },
    path: '/system',
    name: 'System',
    children: [
      {
        meta: {
          title: '权限菜单配置',
          authority: ['SysBackendMenu'],
        },
        name: 'SysBackendMenu',
        path: '/system/backend-menu',
        component: () => import('#/views/system/backend-menu/index.vue'),
      },
      {
        meta: {
          title: '管理员管理',
          authority: ['SysUser'],
        },
        name: 'SysUser',
        path: '/system/user',
        component: () => import('#/views/system/user/index.vue'),
      },
      {
        meta: {
          title: '角色管理',
          authority: ['SysRole'],
        },
        name: 'SysRole',
        path: '/system/role',
        component: () => import('#/views/system/role/index.vue'),
      },
    ],
  },
];

export default routes;
