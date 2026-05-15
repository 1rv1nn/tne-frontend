import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/login' },
      {
        path: '/login',
        component: () => import('pages/LoginPage.vue'),
        meta: { guest: true },
      },
      {
        path: '/register',
        component: () => import('pages/RegisterPage.vue'),
        meta: { guest: true },
      },
      {
        path: '/welcome',
        component: () => import('pages/WelcomePage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
