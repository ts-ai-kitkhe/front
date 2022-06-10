<template>
  <div class="books-container content-wrap">
    <div class="container my-5">
      <div class="row">
        <div class="col-lg-3 px-5">
          <filter-bar />
        </div>
        <div class="col-lg-9 px-lg-5">
          <div class="books-row">
            <div class="row">
              <book-card
                v-for="book in allBooks"
                :key="book.id"
                :book-info="book"
              />
            </div>
          </div>
        </div>
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

<style lang="scss" scoped>
.books-container {
  .books-row {
    .row {
      align-items: center;

      @include xs {
        justify-content: center;
      }
    }
  }
}
</style>
