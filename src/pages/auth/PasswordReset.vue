<template>
  <v-container>
    <v-row class="text-center justify-center">
      <v-card class="mt-12 col-md-3" v-if="formShow">

        <v-card-title>Password reset</v-card-title>

        <v-form  v-model="valid" ref="form" @submit.prevent="request">
          <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="passwordShow ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  hint="At least 6 characters"
                  outlined
                  counter
                  @click:append="passwordShow = !passwordShow"
                ></v-text-field>
              </v-col>

              <v-col cols="12" >
                <v-btn
                  color="primary"
                  width="100%"
                  elevation="2"
                  type="submit"
                  :disabled="!valid"
                >Set password</v-btn>
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
  name: "ResetPassword",
  mixins: [notification],
  props: ['token'],
  data: () => ({
    valid: false,
    formShow: false,
    passwordShow: false,
    password: '',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 6 characters',
    }
  }),
  async mounted() {
    try {
      await axios.get('/auth/reset/validate_token/' + this.$route.params.token);
      this.formShow = true;
    } catch(error) {
      this.showError(error, -1);
    }
  },
  methods: {
    ...mapActions(
      'main',
      {
        showNotification: 'showNotification'
      }
    ),
    async request() {
      try {
        await axios.post('/auth/reset', {
          token: this.$route.params.token,
          password: this.password
        });

        this.$refs.form.reset(); // May cause errors

        this.showNotification({
          type: 'success',
          msg: 'Password was successfully changed.',
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
