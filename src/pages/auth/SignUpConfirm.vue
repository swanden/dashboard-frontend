<template>
  <v-container>
    <v-row class="text-center justify-center">
      <v-col class="mt-12">
        <v-btn
          color="primary"
          href="/login"
        >
          Sign in
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import mixins from 'vue-typed-mixins';
import axios from '@/axios';
import notification from "@/mixins/notification";
import { SnackBarType } from '@/store/modules/notification/types';

export default mixins(notification).extend({
  name: "SignUpConfirm",
  // mixins: [notification],
  async mounted() {
    if (!this.$route.query.token) {
      this.showNotification({
        type: SnackBarType.ERROR,
        msg: 'Error: Token required.',
        timeout: -1
      });

      return null;
    }

    try {
      await axios.get(`/auth/signup/confirm?token=${this.$route.query.token}`);

      this.showNotification({
        type: SnackBarType.SUCCESS,
        msg: 'Email successfully confirmed.',
        timeout: -1
      });
    } catch (error) {
      this.showError(error);
    }
  }
});
</script>

<style scoped>

</style>
