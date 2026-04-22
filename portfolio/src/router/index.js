import { createRouter, createWebHistory } from 'vue-router'
import info from '../pages/info.vue'
import work from '../pages/work.vue'
import Projecten from '@/pages/projecten.vue';

const routes = [
  {
    path: '/',
    name: 'info',
    component: info,
  }, {
    path: '/work',
    name: 'work',
    component: work,
  },
  {
    path: '/project',
    name: 'project',
    component: Projecten,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router
