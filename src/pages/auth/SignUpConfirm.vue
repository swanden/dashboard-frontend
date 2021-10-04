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
import axios from '@/axios';
import notificationMixin from "@/mixins/notification";

export default {
  name: "SignUpConfirm",
  mixins: [notificationMixin],
  async mounted() {
    if (!this.$route.query.token) {
      this.showNotification({
        type: 'error',
        msg: 'Error: Token required.',
        timeout: -1
      });

      return null;
    }

    try {
      await axios.get(`/auth/signup/confirm?token=${this.$route.query.token}`);

      this.showNotification({
        type: 'success',
        msg: 'Email successfully confirmed.',
        timeout: -1
      });
    } catch (error) {
      this.showError(error);
    }
  }
}
</script>

<style scoped>

</style>
