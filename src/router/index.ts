import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store/index'

import Home from '@/pages/Home.vue'
import Login from '@/pages/auth/Login.vue'
import SignUp from '@/pages/auth/SignUp.vue';
import SignUpConfirm from '@/pages/auth/SignUpConfirm.vue';
import PasswordResetRequest from '@/pages/auth/PasswordResetRequest.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
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
    component: () => import('@/pages/auth/PasswordReset.vue'),
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/users/Profile.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/pages/users/Users.vue'),
  },
  {
    path: '*',
    redirect: '/404'
  },
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
});

export default router
