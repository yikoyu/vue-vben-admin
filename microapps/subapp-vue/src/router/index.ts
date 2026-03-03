import type { App } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

import About from '../pages/about.vue';
import Index from '../pages/index.vue';

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Index,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
];

export const initRouter = (app: App, base?: string) => {
  const router = createRouter({
    history: createWebHistory(base),
    routes,
  });
  app.use(router);
};
