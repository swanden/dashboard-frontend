import {mapActions} from "vuex";
import {snackbarTimeout} from '@/store/modules/notification';
import { AxiosError }from 'axios';
import Vue from 'vue';
import { SnackBarType } from '@/store/modules/notification/types';

export default Vue.extend({
  methods: {
    ...mapActions(
      'notification',
      {
        showNotification: 'showNotification'
      }
    ),
    // eslint-disable-next-line
    showError(error: AxiosError<any, any>, timeout: number = snackbarTimeout): void {
      if (error.response?.data?.message) {
        this.showNotification({
          type: SnackBarType.ERROR,
          msg: `Error: ${error.response.data.message}`,
          timeout: timeout
        });
      } else if (error.response?.data?.error?.message) {
        this.showNotification(
          {
            type: SnackBarType.ERROR,
            msg: `Error: ${error.response.data.error.message}`,
            timeout: timeout
          });
      } else if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        this.showNotification(
          {
            type: SnackBarType.ERROR,
            msg: `Errors: ${error.response.data.errors.join(' ')}`,
            timeout: timeout
          });
      } else {
        this.showNotification({
          type: SnackBarType.ERROR,
          msg: `Error: ${error.message}`,
          timeout: timeout
        });
      }
    }
  }
});
