const snackbarTimeout = 5000;

export { snackbarTimeout };

export default {
  namespaced: true,
  state: {
    isShowSnackbar: false,
    snackbarText: '',
    snackbarType: 'info',
    snackbarTimeout: snackbarTimeout,
    snackbarProps: {
      info: {
        btnColor: 'white',
        snackbarColor: ''
      },
      success: {
        btnColor: 'white',
        snackbarColor: 'success'
      },
      error: {
        btnColor: 'white',
        snackbarColor: 'error'
      },
    }
  },
  getters: {
    isShowSnackbar(state) {
      return state.isShowSnackbar;
    },
    snackbarText(state) {
      return state.snackbarText;
    },
    snackbarType(state) {
      return state.snackbarType;
    },
    snackbarProps(state) {
      return state.snackbarProps;
    },
    snackbarTimeout(state) {
      return state.snackbarTimeout;
    }
  },
  mutations: {
    setIsShowSnackBar(state, value) {
      state.isShowSnackbar = value;
    },
    showNotification(state, data) {
      state.snackbarType = data.type;
      state.snackbarText = data.msg;
      state.snackbarTimeout = data.timeout || snackbarTimeout;
      state.isShowSnackbar = true;
    }
  },
  actions: {
    setIsShowSnackBar(store, value) {
      store.commit('setIsShowSnackBar', value);
    },
    showNotification(store, data) {
      store.commit('showNotification', data);
    }
  }
}
