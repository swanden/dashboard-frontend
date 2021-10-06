<template>
  <v-app>

    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <a href="/">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
        </a>

        <h1 class="text-uppercase">Dashboard</h1>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row class="text-center justify-center">
          <v-col>

            <v-tabs class="d-flex justify-center">
              <v-tab
                v-for="tab in authMenuTabs"
                :to="tab.url"
                :key="tab.name"
              >{{ tab.name }}</v-tab>
            </v-tabs>
            <keep-alive>
              <router-view/>
            </keep-alive>

          </v-col>
        </v-row>
      </v-container>

      <notification></notification>
    </v-main>
  </v-app>
</template>

<script>
import Notification from './Notification';

export default {
  name: "Auth",
  components: {
    Notification
  },
  data() {
    return {
      authMenuTabs: [
        {
          name: 'Sign in',
          url: '/login'
        },
        {
          name: 'Sign up',
          url: '/signup'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
