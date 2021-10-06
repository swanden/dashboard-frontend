<template>
  <v-app>

    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
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

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="@/assets/account.jpeg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ email }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"

          :to="item.url"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          key="logout"
          link
          @click="performLogout"
        >
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-row>
          <v-col>
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
import Notification from "@/layouts/Notification";
import { mapGetters, mapActions } from 'vuex';
import notification from "@/mixins/notification";

export default {
  name: "Auth",
  components: {
    Notification
  },
  mixins: [notification],
  data() {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'mdi-home', url: '/' },
        { title: 'About', icon: 'mdi-forum', url: '/about' },
      ],
    }
  },
  computed: {
    ...mapGetters(
      'auth',
      { email: 'getEmail' }
    )
  },
  methods: {
    ...mapActions(
      'auth',
      { logout: 'logout' }
    ),
    async performLogout() {
      try {
        await this.logout();
        await this.$router.push({ name: 'login' });
      } catch (error) {
        this.showError(error);
      }
    }
  }
}
</script>

<style scoped>

</style>
