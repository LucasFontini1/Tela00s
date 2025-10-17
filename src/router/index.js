import path from 'node:path'
import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/homeView.vue'
import tv from '../views/tvView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: home,
      component: home,
    },
    {
      path: '/series',
      name: tv,
      component: tv,
    },
  ],
})

export default router
