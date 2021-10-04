import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/pages/auth/Login.vue'
import SignUp from "@/pages/auth/SignUp";
import SignUpConfirm from "@/pages/auth/SignUpConfirm";
import PasswordResetRequest from "@/pages/auth/PasswordResetRequest";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    // redirect: '/login'
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/signup/confirm',
    name: 'signup.confirm',
    component: SignUpConfirm
  },
  {
    path: '/reset/request',
    name: 'reset.request',
    component: PasswordResetRequest
  },
  {
    path: '/reset/:token',
    name: 'reset',
    component: () => import('../pages/auth/PasswordReset.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../pages/404Page.vue')
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (localStorage.getItem('user') == null) {
//       next({
//         path: '/login',
//         params: { nextUrl: to.fullPath }
//       })
//     } else {
//       let user = JSON.parse(localStorage.getItem('user'))
//       if (to.matched.some(record => record.meta.is_admin)) {
//         if (user.is_admin == 1) {
//           next()
//         } else {
//           next({ name: 'userboard' })
//         }
//       } else {
//         next()
//       }
//     }
//   } else if (to.matched.some(record => record.meta.guest)) {
//     if (localStorage.getItem('user') == null) {
//       next()
//     } else {
//       next({ name: 'userboard' })
//     }
//   } else {
//     next()
//   }
// })


export default router
