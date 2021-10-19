<template>
  <div>
    <Main v-if="isLoggedIn"></Main>
    <Auth v-else></Auth>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Auth from '@/layouts/Auth.vue';
import Main from '@/layouts/Main.vue';
import { mapGetters } from "vuex";

export default Vue.extend({
  name: 'App',
  components: {
    Auth,
    Main
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(
        'auth',
        { isLoggedIn: 'isLoggedIn' }
    )
  }
});
</script>
