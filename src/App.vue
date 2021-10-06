<template>
  <div>
    <Main v-if="isLoggedIn"></Main>
    <Auth v-else></Auth>
  </div>
</template>

<script>
import Auth from '@/layouts/Auth';
import Main from '@/layouts/Main';
import { mapGetters } from "vuex";

export default {
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
};
</script>
