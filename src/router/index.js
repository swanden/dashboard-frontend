import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

import Home from '@/views/Home.vue'
import Login from '@/pages/auth/Login.vue'
import SignUp from "@/pages/auth/SignUp";
import SignUpConfirm from "@/pages/auth/SignUpConfirm";
import PasswordResetRequest from "@/pages/auth/PasswordResetRequest";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // redirect: '/login'
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/signup/confirm',
    name: 'signup.confirm',
    component: SignUpConfirm,
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/reset/request',
    name: 'reset.request',
    component: PasswordResetRequest,
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/reset/:token',
    name: 'reset',
    component: () => import('../pages/auth/PasswordReset.vue'),
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../pages/404Page.vue'),
    meta: {
      hideForAuth: true
    }
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
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.hideForAuth)) {
    if (!store.getters['auth/isLoggedIn']) {
      next()
      return;
    }

    next({ name: 'home' })
  } else {
    if (!store.getters['auth/isLoggedIn']) {
      next({name: 'login'});
      return;
    }

    next()
  }
})


export default router
