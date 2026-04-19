import { createRouter, createWebHistory } from 'vue-router'
import info from '../pages/info.vue'
import work from '../pages/work.vue'

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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router
