import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Root from '@/views-c/Root.vue'
import CustomerHome from '@/views-c/CustomerHome.vue'
import SignUp from '@/views-c/SignUp.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/sign-up',
    component: SignUp
  },
  {
    path: '/',
    component: Root,
    children: [
      {
        path: 'home',
        component: CustomerHome
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
