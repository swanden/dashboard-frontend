<template>
  <v-container>
    <v-row class="text-center justify-center">
      <v-card class="mt-12" style="max-width:400px;">

        <v-card-title>Login</v-card-title>

        <v-form  v-model="valid" ref="form">
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


              <v-col cols="12" class="text-right">
                <v-btn
                    color="primary"
                    elevation="2"
                    class="justify-end"
                    @click="login"
                >Login</v-btn>
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn
                    color="primary"
                    elevation="2"
                    class="justify-end"
                    @click="send"
                >Send</v-btn>
              </v-col>


              <v-snackbar
                  v-model="snackbar"
                  top
                  color="red"
              >
                {{ snackbarText }}

                <template v-slot:action="{ attrs }">
                  <v-btn
                      color="black"
                      text
                      v-bind="attrs"
                      @click="snackbar = false"
                  >
                    Close
                  </v-btn>
                </template>
              </v-snackbar>

            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from '@/axios.js';

export default {
  name: "Login",
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
    },
    snackbar: false,
    snackbarText: 'Error'
  }),
  methods: {
    async login() {
      if (!this.$refs.form.validate()) {
        return;
      }

      // const params = new URLSearchParams();
      // params.append('grant_type', 'password');
      // params.append('client_id', process.env.VUE_APP_OAUTH_CLIENT);
      // params.append('client_secret', process.env.VUE_APP_OAUTH_SECRET);
      // params.append('username', this.email);
      // params.append('password', this.password);
      //
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }
      //
      // try {
      //   const response = await axios.post('/token', params, config);
      //   console.log(response);
      // } catch (error) {
      //   if (error.response.data?.error?.message) {
      //     this.snackbarText = error.response.data.error.message;
      //   }
      //   this.snackbar = true;
      // }

      this.$store.dispatch('login', {
        username: this.email,
        password: this.password,
      })
          .then(() => {
            // this.$router.push({name: 'home'});
            console.log('OK')
          })
          .catch(error => {
            if (error.response) {
              this.text = error.response.data.error.message;
            } else {
              console.log(error);
            }
          });
    },
    async send() {
      try {
        const data = axios.get('/api/profile');
        console.log(data);
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>

</style>