<template>
  <v-snackbar
    v-model="isShowSnackbar"
    top
    :timeout="snackbarTimeout"
    :color="snackbarProps[snackbarType].snackbarColor"

  >
    {{ snackbarText }}

    <template v-slot:action="{ attrs }">
      <v-btn
        :color="snackbarProps[snackbarType].btnColor"
        text
        v-bind="attrs"
        @click="isShowSnackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Notification",
  computed: {
    isShowSnackbar: {
      get() {
        return this.$store.getters["notification/isShowSnackbar"];
      },
      set(value) {
        this.$store.dispatch('notification/setIsShowSnackBar', value)
      }
    },
    ...mapGetters(
      'notification',
      {
        snackbarText: 'snackbarText',
        snackbarType: 'snackbarType',
        snackbarTimeout: 'snackbarTimeout',
        snackbarProps: 'snackbarProps'
      }
    )
  }
}
</script>

<style scoped>

</style>
