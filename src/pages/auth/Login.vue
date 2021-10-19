<template>
  <v-container>
    <v-row class="text-center justify-center">
      <v-card class="mt-12 col-md-3">

        <v-card-title>Login</v-card-title>

        <v-form  v-model="valid" ref="form" @submit.prevent="login">
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


              <v-col cols="6" class="text-left">
                <v-btn
                  color="primary"
                  elevation="2"
                  class="justify-end"
                  type="submit"
                  :disabled="!valid"
                >Login</v-btn>
              </v-col>
              <v-col cols="6" class="d-flex align-center justify-end" >
                <router-link to="/reset/request">Forgot password?</router-link>
              </v-col>

            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import mixins from 'vue-typed-mixins';
import notification from "@/mixins/notification";

export default mixins(notification).extend({
  name: "Login",
  // mixins: [notification],
  data: () => ({
    valid: false,
    passwordShow: false,
    password: '',
    email: '',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 6 characters',
      emailMatch: () => (`The email and password you entered don't match`),
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
    }
  }),
  methods: {
    async login() {
      try {
        await this.$store.dispatch('auth/login', {
          username: this.email,
          password: this.password,
        });

        this.$router.push({ name: 'home' });
      } catch (error) {
        this.showError(error);
      }
    }
  }
});
</script>

<style scoped>

</style>
