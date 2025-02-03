import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/Home.vue'),
    },
    {
      path: '/',
      name: 'user',
      component: () => import('@/features/user/User.vue'),
      children: [
        {
          path: '/',
          name: 'news',
          component: () => import('@/pages/News.vue'),
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/pages/Profile.vue'),
        }
      ]
    },
  ],
})

export default router
