<template>
  <v-badge
    :content="role"
    :color="colors[role]"
  ></v-badge>
</template>

<script>
export const roles = [
  'Admin',
  'User'
];

export default {
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
}
</script>

<style scoped>

</style>
