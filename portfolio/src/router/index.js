import { createRouter, createWebHistory } from 'vue-router'
import info from '../pages/info.vue'
import work from '../pages/work.vue'
import CvPage from '../pages/cv.vue'
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
    path: '/cv',
    name: 'cv',
    component: CvPage,
  },
  {
    path: '/project/:id',
    name: 'project',
    component: Projecten,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
});

export default router
