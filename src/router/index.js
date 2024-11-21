import { createMemoryHistory, createRouter } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/activities/BasicRouting.vue'),
    },
    {
      path: '/basicRouting',
      name: 'av-routing',
      component: () => import('../views/activities/BasicRouting.vue'),
    },
    {
      path: '/basicDisplays',
      name: 'displays',
      component: () => import('../views/activities/BasicDisplays.vue'),
    },
  ]
})

export default router
