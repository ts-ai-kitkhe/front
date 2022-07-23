<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'operator',
  middleware: 'auth',

  mounted() {
    this.$router.push('/admin/books')
  },
}
</script>
