import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Root from '@/views-c/Root.vue'
import Login from '@/views-c/Login.vue'
import Cart from '@/views-c/Cart.vue'
import OrderDetail from '@/views-c/OrderDetail.vue'
import Profile from '@/views-c/Profile.vue'
import AdminRoot from '@/views-b/Root.vue'
import Home from '@/views-b/Home.vue'
import MenuManage from '@/views-b/MenuManage.vue'
import OrderManage from '@/views-b/OrderManage.vue'
import CustomerHome from '@/views-c/CustomerHome.vue'
import OrderHistory from '@/views-c/OrderHistory.vue'
import SignUp from '@/views-c/SignUp.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/sign-up',
    component: SignUp,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: Root,
    children: [
      {
        path: 'home',
        component: CustomerHome,
      },
      {
        path: 'cart',
        component: Cart,
      },
      {
        path: 'history',
        component: OrderHistory,
      },
      {
        path: 'order',
        component: OrderDetail,
      },
      {
        path: 'order-detail/:id',
        component: OrderDetail,
        props: true,
      },
      {
        path: 'profile',
        component: Profile,
      },
    ],
  },
  {
    path: '/admin',
    component: AdminRoot,
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'menu',
        component: MenuManage,
      },
      {
        path: 'order',
        component: OrderManage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
