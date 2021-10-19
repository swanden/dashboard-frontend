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

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from "vuex";

export default Vue.extend({
  name: "Notification",
  computed: {
    ...mapGetters(
        'notification',
        {
          snackbarText: 'snackbarText',
          snackbarType: 'snackbarType',
          snackbarTimeout: 'snackbarTimeout',
          snackbarProps: 'snackbarProps'
        }
    ),
    isShowSnackbar: {
      get(): boolean {
        return this.$store.getters["notification/isShowSnackbar"];
      },
      set(value: boolean): void {
        this.$store.dispatch('notification/setIsShowSnackBar', value)
      }
    }
  }
});
</script>

<style scoped>

</style>
