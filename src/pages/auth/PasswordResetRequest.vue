<template>
  <v-container>
    <v-row class="text-center justify-center">
      <v-card class="mt-12 col-md-3">

        <v-card-title>Password reset</v-card-title>

        <v-form  v-model="valid" ref="form" @submit.prevent="request">
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  label="Email"
                  outlined
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" >
                <v-btn
                  color="primary"
                  width="100%"
                  elevation="2"
                  type="submit"
                  :disabled="!valid"
                >Reset password</v-btn>
              </v-col>

            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import notification from "@/mixins/notification";
import {mapActions} from 'vuex';
import axios from "@/axios";

export default {
  name: "ResetPasswordRequest",
  mixins: [notification],
  data: () => ({
    valid: false,
    email: '',
    rules: {
      required: value => !!value || 'Required.',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
    }
  }),
  methods: {
    ...mapActions(
      'notification',
      {
        showNotification: 'showNotification'
      }
    ),
    async request() {
      try {
        await axios.post('/auth/reset/request', {
          email: this.email
        });

        this.$refs.form.reset(); // May cause errors

        this.showNotification({
          type: 'success',
          msg: 'Check your email.',
          timeout: -1
        });
      } catch (error) {
        this.showError(error);
      }
    }
  }
}
</script>

<style scoped>

</style>
