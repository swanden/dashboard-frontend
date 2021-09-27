import axios from 'axios';
import store from './store/index'
import router from './router/index'

// const http = axios.create({ baseURL: process.env.VUE_APP_API_URL });
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
// if (localStorage.getItem('access_token')) {
//     http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
// }

const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
}

axios.interceptors.response.use(null, error => {
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
    return store.dispatch('refresh')
        .then(() => {
            return new Promise((resolve) => {
                request.headers['Authorization'] = 'Bearer ' + store.state.user.access_token;
                resolve(axios(request))
            })
        })
        .catch(() => {
            router.push({name: 'login'});
            return Promise.reject(error)
        });
});

export default axios;

//
// window.axios.interceptors.response.use(
//     response => {
//       if (response.data instanceof Blob) {
//         return response.data;
//       }
//       return response.data || {};
//     },
//     async error => {
//       if (error.response) {
//         if (error.request.status === 401) {
//           localStorage.removeItem('access_token');
//           localStorage.removeItem('refresh_token');
//           location.href = '/login';
//
//           return Promise.reject(error);
//
//           // if (error.config.url.includes('/token')) {
//           //     // Refresh token has failed. Logout the user
//           //     localStorage.removeItem('access_token');
//           //     localStorage.removeItem('refresh_token');
//           //     location.href = '/login';
//           // } else {
//           //     let refreshToken = localStorage.getItem('refresh_token');
//           //
//           //     let reqData = {
//           //         'grant_type': 'refresh_token',
//           //         'refresh_token': refreshToken,
//           //         'client_id': 'app',
//           //         'client_secret': 'secret'
//           //     };
//           //     let query = Object.keys(reqData).map(k => encodeURIComponent(k) + "=" + encodeURIComponent(reqData[k])).join("&");
//           //
//           //     let data = await axios.post('token', query, {
//           //         headers: {
//           //             'Content-Type':'application/x-www-form-urlencoded'
//           //         }
//           //     });
//           //
//           //     alert('token refreshed');
//           //     if (data.access_token) {
//           //         window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
//           //         localStorage.setItem('access_token', data.access_token);
//           //         localStorage.setItem('refresh_token', data.refresh_token);
//           //
//           //         await Vue.$router.push(Vue.$router.history.current.query.redirect || '/');
//           //     }
//           //
//           // }
//         }
//
//
//         Vue.prototype.$notify({
//           type: 'error',
//           title: 'Error',
//           text: error.response.data.message || "Что-то пошло не так",
//         });
//       } else {
//         Vue.prototype.$notify({
//           type: 'error',
//           title: 'Error',
//           text: 'Невозможно соединиться с сервером',
//         });
//       }
//       return Promise.reject(error);
//     }
// );