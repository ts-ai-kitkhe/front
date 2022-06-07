<template>
  <div class="container">
    <div v-for="book in books" :key="book.id">
      {{ book.title }}
    </div>
  </div>
</template>

<script>
export default {
  layout: 'catalogue',

  computed: {
    books() {
      return this.$store.state.books.books
    },
  },

  mounted() {
    this.$store.dispatch('books/getBooks')
  },
}
</script>

<style lang="scss" scoped></style>
