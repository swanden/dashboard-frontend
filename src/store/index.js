import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentEmail: null,
    user: JSON.parse(localStorage.getItem('user')),
    notifications: []
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user;
    }
  },
  mutations: {
    changeCurrentEmail(state, email) {
      state.currentEmail = email;
    },
    login(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
    addNotification(state, notification) {
      state.notifications.push(notification);
    },
    removeNotification(state, index) {
      delete state.notifications[index];
    }
  },
  actions: {
    login(context, data) {
      return new Promise((resolve, reject) => {
        context.commit('logout');

        const params = new URLSearchParams();
        params.append('grant_type', 'password');
        params.append('client_id', process.env.VUE_APP_OAUTH_CLIENT);
        params.append('client_secret', process.env.VUE_APP_OAUTH_SECRET);
        params.append('username', data.username);
        params.append('password', data.password);

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };

        axios.post('/token', params, config)
            .then(response => {
              const user = response.data;
              localStorage.setItem('user', JSON.stringify(user));
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
              context.commit('login', user);
              resolve(user)
            })
            .catch(error => {
              context.commit('logout');
              localStorage.removeItem('user');
              reject(error)
            })
      })
    },
    logout(context) {
      return new Promise((resolve) => {
        context.commit('logout');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        resolve()
      });
    },
    refresh(context) {
      return new Promise((resolve, reject) => {
        if (context.state.user) {
          console.log('refresh')
          const params = new URLSearchParams();
          params.append('grant_type', 'refresh_token');
          params.append('client_id', process.env.VUE_APP_OAUTH_CLIENT);
          params.append('client_secret', process.env.VUE_APP_OAUTH_SECRET);
          params.append('refresh_token', context.state.user.refresh_token);

          const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }


          delete axios.defaults.headers.common['Authorization'];
          // return axios.post('/token', {
          //   grant_type: 'refresh_token',
          //   refresh_token: context.state.user.refresh_token,
          //   client_id: 'oauth_client',
          //   client_secret: 'secret',
          // })
          return axios.post('/token', params, config)
              .then(response => {
                const user = response.data;
                localStorage.setItem('user', JSON.stringify(user));
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
                context.commit('login', user);
                resolve(response)
              })
              .catch(error => {
                context.dispatch('logout');
                reject(error)
              })
        }
        resolve()
      });
    }
  },
  modules: {
  }
})
