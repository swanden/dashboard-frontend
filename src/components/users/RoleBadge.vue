<template>
  <v-badge
    :content="role"
    :color="colors[role]"
  ></v-badge>
</template>

<script>
import Vue from 'vue';

export const roles = [
  'Admin',
  'User'
];

export default Vue.extend({
  name: "RoleBadge",
  props: {
    role: String,
  },
  data: () => ({
    colors: {
      'Admin': 'green',
      'User': 'grey'
    }
  })
});
</script>

<style scoped>

</style>
