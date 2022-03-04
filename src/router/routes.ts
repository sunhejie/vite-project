import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import('views/Login/Login.vue'),
  },
  { name: 'home', path: '/', component: () => import('views/Home/Home.vue') },
]
