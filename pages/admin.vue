<template>
  <nuxt-child />
</template>

<script>
export default {
  middleware: 'auth',

  mounted() {
    this.$router.push('/admin/books')
  },
}
</script>
