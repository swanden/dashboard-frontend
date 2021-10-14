import axios from 'axios';
import store from './store/index'
import router from './router/index'

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const user = JSON.parse(localStorage.getItem('user'));
if (user) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
}

axios.interceptors.response.use(response => {
  if (response.data instanceof Blob) {
    return response.data;
  }
  return response.data || {};
}, async (error) => {
  if (!error.response || error.response.status !== 401) {
    return Promise.reject(error);
  }
  const request = error.config;
  if (request.data) {
    let data = JSON.parse(request.data);
    if (data && data.grant_type) {
      return Promise.reject(error);
    }
  }

  try {
    await store.dispatch('auth/refresh');
    request.headers['Authorization'] = 'Bearer ' + store.state?.user?.access_token;

    // console.log('router.history.current.fullPath', router.history.current.fullPath);
    const url = router.history.current.fullPath || '/';

    // await router.push({path: url})

    router.go(url);

    // return axios(request);
  } catch (error) {
    if (router.history.current.path !== '/login' && !store.getters['auth/isLoggedIn']) {
      router.push({ name: 'login' });
      return Promise.reject(error);
    }
  }
});

export default axios;
