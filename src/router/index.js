import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: () => import('@/pages/Auth.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/pages/Admin.vue')
      // meta: { requiresAuth: true }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/features/user/User.vue'),
      children: [
        {
          path: '/user',
          name: 'news',
          component: () => import('@/pages/News.vue'),
        },
        {
          path: '/user/profile',
          name: 'profile',
          component: () => import('@/pages/Profile.vue'),
        },
        {
          path: '/user/chatList',
          name: 'chatList',
          component: () => import('@/pages/ChatList.vue'),
        },
        {
          path: '/user/chat/:id',
          name: 'chat',
          component: () => import('@/features/user/Chat.vue'),
        },
        {
          path: '/user/frends',
          name: 'frends',
          component: () => import('@/pages/Frends.vue'),
        },
        {
          path: '/user/frend/:id',
          name: 'frend',
          component: () => import('@/pages/FrendProfile.vue'),
          props: true
        }
      ]
    },
  ],
})

export default router
