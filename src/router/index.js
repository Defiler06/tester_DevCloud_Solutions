import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/components/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'HomePage',
        component: () => import('@/views/ShowTasks.vue'),
      },
      {
        path: '/addTask',
        name: 'AddTask',
        component: () => import('@/views/AddTask.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
