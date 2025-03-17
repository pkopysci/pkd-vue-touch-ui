import { createMemoryHistory, createRouter } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/activities/BasicRouting.vue')
    },
    {
      path: '/basicRouting',
      name: 'av-routing',
      component: () => import('../views/activities/BasicRouting.vue')
    },
    {
      path: '/basicDisplays',
      name: 'displays',
      component: () => import('../views/activities/BasicDisplays.vue')
    },
    {
      path: '/basicMics',
      name: 'mics',
      component: () => import('../views/activities/BasicMics.vue')
    },
    {
      path: '/basicLighting',
      name: 'lighting',
      component: () => import('../views/activities/BasicLighting.vue')
    },
    {
      path: '/videoWall',
      name: 'video-wall',
      component: () => import('../views/activities/VideoWall.vue')
    },
    {
      path: '/routableMics',
      name: 'mics-routable',
      component: () => import('../views/activities/RoutableMics.vue')
    },
    {
      path: '/eventmode',
      name: 'generic-events',
      component: () => import('../views/activities/EventMode.vue')
    },
    {
      path: '/videomatrix',
      name: 'video-matrix',
      component: () => import('../views/activities/VideoMatrix.vue')
    },
    {
      path: '/audiomatrix',
      name: 'audio-matrix',
      component: () => import('../views/activities/AudioMatrix.vue')
    },
    {
      path: '/videoconference',
      name: 'video-conference',
      component: () => import('../views/activities/VideoConference.vue')
    },
    {
      path: '/cameracontrol',
      name: 'cameras',
      component: () => import('../views/activities/CameraControl.vue')
    }
  ]
})

export default router
