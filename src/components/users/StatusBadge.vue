<template>
  <v-badge
    :content="status"
    :color="colors[status]"
  ></v-badge>
</template>

<script>
export const statuses = [
  'Active',
  'Blocked'
];

export default {
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
}
</script>

<style scoped>

</style>
