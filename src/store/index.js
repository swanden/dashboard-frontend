import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import notification from './modules/notification';
import auth from './modules/auth';

export default new Vuex.Store({
  modules: {
    notification,
    auth
  },
  // strict: process.env.MODE_INV !== 'production'
})
