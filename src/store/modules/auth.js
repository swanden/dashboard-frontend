import axios from "@/axios";

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

export default {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem('user')),
    email: JSON.parse(localStorage.getItem('email'))
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user;
    },
    getEmail(state) {
      return state.email;
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
    },
    setEmail(state, email) {
      state.email = email;
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
        user.roles = await axios.get('/profile/role');
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('email', JSON.stringify(data.username));
        context.commit('login', user);
        context.commit('setEmail', data.username);

        return user;
      } catch (error) {
        context.commit('logout');
        context.commit('setEmail', null);
        localStorage.removeItem('user');
        localStorage.removeItem('email');

        return Promise.reject(error);
      }
    },
    async logout(context) {
      context.commit('logout');
      context.commit('setEmail', null);
      localStorage.removeItem('user');
      localStorage.removeItem('email');
      delete axios.defaults.headers.common['Authorization'];

      return Promise.resolve();
    },
    async refresh(context) {
      if (context.state.user) {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('client_id', process.env.VUE_APP_OAUTH_CLIENT);
        params.append('client_secret', process.env.VUE_APP_OAUTH_SECRET);
        params.append('refresh_token', context.state.user.refresh_token);

        delete axios.defaults.headers.common['Authorization'];

        try {
          const user = await axios.post('/token', params, config);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
          user.roles = await axios.get('/profile/role');
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
