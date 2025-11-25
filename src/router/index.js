import path from 'node:path'
import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/homeView.vue'
import tv from '../views/tvView.vue'
import tvDetailsView from '@/views/tvDetailsView.vue'
import seasonDetailView from '@/views/seasonDetailView.vue'
import actorView from '@/views/actorView.vue'
import ActorComponent from '@/components/actorComponent.vue'

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
    {
      path: '/series/:id',
      name: 'tvDetails',
      component: tvDetailsView,
      props: true
    },
    {
      path: '/series/:id/season/:seasonNumber',
      name: 'seasonDetails',
      component: seasonDetailView,
      props: true
    },
    {
      path: '/ator/:id',
      name: 'ator',
      component: ActorComponent,
      props: true
    },
  ],
})

export default router
