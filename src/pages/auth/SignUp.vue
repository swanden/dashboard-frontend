<template>
  <v-container>
<!--    <v-row class="justify-center">-->
<!--      <v-col class="col-md-4">-->
<!--        <v-alert type="success">-->
<!--          User was successfully signed up. Please, visit your email box to confirm your email address.-->
<!--        </v-alert>-->
<!--      </v-col>-->
<!--    </v-row>-->
    <v-row class="text-center justify-center">
        <v-card class="col-md-3">

          <v-card-title>Sign up</v-card-title>

          <v-form  v-model="valid" ref="form" @submit.prevent="signUp">
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

                <v-col cols="12">
                  <v-text-field
                    v-model="confirmPassword"
                    :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min, emailMatch]"
                    :type="confirmPasswordShow ? 'text' : 'password'"
                    name="input-10-1"
                    label="Confirm Password"
                    hint="At least 6 characters"
                    outlined
                    counter
                    @click:append="confirmPasswordShow = !confirmPasswordShow"
                  ></v-text-field>
                </v-col>


                <v-col cols="12" class="text-right">
                  <v-btn
                    color="primary"
                    elevation="2"
                    class="justify-end"
                    type="submit"
                    :disabled="!valid"
                  >Sign up</v-btn>
                </v-col>

              </v-row>
            </v-container>
          </v-form>
        </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from '@/axios';
import {mapActions} from 'vuex';
import notification from "@/mixins/notification";

export default {
  name: "SignUp",
  mixins: [notification],
  data: () => ({
    valid: false,
    passwordShow: false,
    password: '',
    confirmPasswordShow: false,
    confirmPassword: '',
    email: '',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 6 characters',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
    }
  }),
  computed: {
    emailMatch() {
      return (value) => value === this.password || `The email and password you entered don't match`;
    }
  },
  methods: {
    ...mapActions(
      'main',
      {
        showNotification: 'showNotification'
      }
    ),
    async signUp() {
      try {
        await axios.post('/auth/signup', {
          email: this.email,
          password: this.password,
        });

        this.$refs.form.reset(); // May cause errors

        this.showNotification({
          type: 'success',
          msg: 'User was successfully signed up. Please, visit your email box to confirm your email address.',
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
