import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: '子应用vue',
    },
    name: 'subapp-vue',
    path: '/subapp-vue',
    children: [
      {
        meta: {
          title: '子应用vue - home',
        },
        name: 'subapp-vue-home',
        path: '/subapp-vue/home',
        component: () => import('#/layouts/subapp.vue'),
      },
      {
        meta: {
          title: '子应用vue - about',
        },
        name: 'subapp-vue-about',
        path: '/subapp-vue/about',
        component: () => import('#/layouts/subapp.vue'),
      },
    ],
  },
];

export default routes;
