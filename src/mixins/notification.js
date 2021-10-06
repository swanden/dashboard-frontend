import {mapActions} from "vuex";
import {snackbarTimeout} from '@/store/modules/notification';

export default {
  methods: {
    ...mapActions(
      'notification',
      {
        showNotification: 'showNotification'
      }
    ),
    showError(error, timeout = snackbarTimeout) {
      if (error.response?.data?.message) {
        this.showNotification({
          type: 'error',
          msg: `Error: ${error.response.data.message}`,
          timeout: timeout
        });
      } else if (error.response?.data?.error?.message) {
        this.showNotification(
          {
            type: 'error',
            msg: `Error: ${error.response.data.error.message}`,
            timeout: timeout
          });
      } else if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        this.showNotification(
          {
            type: 'error',
            msg: `Errors: ${error.response.data.errors.join(' ')}`,
            timeout: timeout
          });
      } else {
        this.showNotification({
          type: 'error',
          msg: `Error: ${error.message}`,
          timeout: timeout
        });
      }
    }
  }
}
