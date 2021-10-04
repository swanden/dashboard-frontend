import axios from "@/axios";

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

export default {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem('user'))
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user;
    },
    isAdmin(state) {
      return state.user.roles.includes('ROLE_ADMIN');
    }
  },
  mutations: {
    login(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    }
  },
  actions: {
    async login(context, data) {
      context.commit('logout');

      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('client_id', process.env.VUE_APP_OAUTH_CLIENT);
      params.append('client_secret', process.env.VUE_APP_OAUTH_SECRET);
      params.append('username', data.username);
      params.append('password', data.password);

      try {
        const user = await axios.post('/token', params, config);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
        user.roles = await axios.get('/user/role');
        localStorage.setItem('user', JSON.stringify(user));
        context.commit('login', user);

        return user;
      } catch (error) {
        context.commit('logout');
        localStorage.removeItem('user');

        return Promise.reject(error);
      }
    },
    async logout(context) {
      context.commit('logout');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];

      return Promise.resolve();
    },
    async refresh(context) {
      console.log('refresh')
      if (context.state.user) {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('client_id', process.env.VUE_APP_OAUTH_CLIENT);
        params.append('client_secret', process.env.VUE_APP_OAUTH_SECRET);
        params.append('refresh_token', context.state.user.refresh_token);

        delete axios.defaults.headers.common['Authorization'];

        try {
          console.log('refresh2')
          const user = await axios.post('/token', params, config);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
          user.roles = await axios.get('/user/role');
          localStorage.setItem('user', JSON.stringify(user));
          context.commit('login', user);

          return user;
        } catch (error) {
          context.dispatch('logout');

          return Promise.reject(error);
        }
      }

      return Promise.resolve();
    }
  }
}
