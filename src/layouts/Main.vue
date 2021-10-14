<template>
  <v-app>

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
          key="Home"

          to="/"
        >
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


        <v-divider></v-divider>
        <v-subheader>Control</v-subheader>

        <v-list-item
          v-for="item in control"
          :key="item.title"
          :to="item.url"
          v-show="!item.adminOnly || (item.adminOnly && isAdmin)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }} {{ item.show }}</v-list-item-title>
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

<!--        <h1 class="text-uppercase">Dashboard</h1>-->
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <v-row>
        <v-col>

          <v-breadcrumbs
            :items="breadcrumbs"
            divider="/"
          ></v-breadcrumbs>

        </v-col>
      </v-row>

<!--      <keep-alive>-->
        <router-view/>
<!--      </keep-alive>-->

      <notification></notification>

    </v-main>
  </v-app>
</template>

<script>
import Notification from "@/components/Notification";
import {mapGetters, mapActions} from 'vuex';
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
      control: [
        {title: 'Profile', icon: 'mdi-account', url: '/profile'},
        {title: 'Users', icon: 'mdi-account-multiple', url: '/users', adminOnly: true},
      ]
    }
  },
  computed: {
    ...mapGetters(
      'auth',
      {
        email: 'getEmail',
        isAdmin: 'isAdmin',
      }
    ),
    breadcrumbs() {
      let breadcrumbs = [];
      if (this.$route.path !== '/') {
        breadcrumbs.push({
          text: 'HOME',
          disabled: false,
          href: '/'
        });
      }

      this.$route.matched.forEach(el => {
        breadcrumbs.push({
          text: el.name.toUpperCase(),
          disabled: this.$route.path === el.path || this.$route.path === el.path + '/',
          href: el.path
        });
      });

      return breadcrumbs;
    }
  },
  methods: {
    ...mapActions(
      'auth',
      {logout: 'logout'}
    ),
    async performLogout() {
      try {
        await this.logout();
        await this.$router.push({name: 'login'});
      } catch (error) {
        this.showError(error);
      }
    }
  }
}
</script>

<style scoped>

</style>
