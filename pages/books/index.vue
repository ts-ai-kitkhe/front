<template>
  <div class="books-container content-wrap">
    <div class="container my-5">
      <div class="row books-cover-row">
        <img
          src="~/assets/images/no_img.png"
          alt="Books Feed Cover"
          class="books-cover mb-5"
        />
      </div>
      <div class="row">
        <div class="col-lg-3 px-lg-5">
          <filter-bar />
        </div>
        <div class="col-lg-9 px-lg-5">
          <search-bar />
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
  .books-cover-row {
    .books-cover {
      width: 100%;
    }
  }
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
