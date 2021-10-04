import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import main from './modules/main';
import auth from './modules/auth';

export default new Vuex.Store({
  modules: {
    main,
    auth
  },
  // strict: process.env.MODE_INV !== 'production'
})
