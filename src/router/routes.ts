import type { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../pages/home/index.vue')
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import('../pages/search/index.vue')
      }
    ]
  }
]

export default routes
