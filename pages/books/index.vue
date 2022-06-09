<template>
  <div class="books-container content-wrap my-5">
    <div class="container">
      <div class="row">
        <book-card v-for="book in allBooks" :key="book.id" :book-info="book" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'catalogue',

  computed: mapGetters('books', ['allBooks']),

  created() {
    this.getBooks()
  },

  methods: {
    ...mapActions('books', ['getBooks']),
  },
}
</script>

<style lang="scss" scoped></style>
