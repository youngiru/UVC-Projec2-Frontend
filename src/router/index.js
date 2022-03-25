import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views'),
    children: [
      {
        path: '/',
        component: () => import('../views/auth/Login.vue')
      },
      {
        path: '/leader',
        component: () => import('../views/leader'),
        children: [
          {
            path: '/leader',
            component: () => import('../views/leader/main.vue')
          },
          {
            path: '/leader/user',
            component: () => import('../views/leader/user/user.vue')
          },
          {
            path: '/leader/device',
            component: () => import('../views/leader/device/device.vue')
          }
        ]
      },
      {
        path: '/auth',
        component: () => import('../views/auth'),
        children: [
          {
            path: '/auth/join',
            component: () => import('../views/auth/Join.vue')
          },
          {
            path: '/auth/logout',
            component: () => import('../views/auth/Logout.vue')
          }
        ]
      },
      {
        path: '/control',
        component: () => import('../views/control'),
        children: [
          {
            path: '/control',
            component: () => import('../views/control/main.vue')
          },
          {
            path: '/control/dashboard',
            component: () => import('../views/control/dashboard.vue')
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: () => import('../components/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
