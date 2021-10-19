import Vue from 'vue'
import Vuex from 'vuex'
import { RootState } from './types'

Vue.use(Vuex)

import { notification } from './modules/notification/index';
import { auth } from './modules/auth/index';

export default new Vuex.Store<RootState>({
  state: {
    version: '1.0.0'
  },
  modules: {
    notification,
    auth
  },
  // strict: process.env.MODE_INV !== 'production'
})
