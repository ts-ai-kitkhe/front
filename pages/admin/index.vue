<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'operator',
  middleware: [
    function ({ redirect }) {
      redirect('/admin/books')
    },
  ],
}
</script>
