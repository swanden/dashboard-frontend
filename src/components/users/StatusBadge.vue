<template>
  <v-badge
    :content="status"
    :color="colors[status]"
  ></v-badge>
</template>

<script>
import Vue from 'vue';

export const statuses = [
  'Active',
  'Blocked'
];

export default Vue.extend({
  name: "StatusBadge",
  props: {
    status: String,
  },
  data: () => ({
    colors: {
      'Active': 'primary',
      'Wait': 'grey',
      'Blocked': 'red',
    }
  })
});
</script>

<style scoped>

</style>
