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
          <FilterBar />
        </div>
        <div class="col-lg-9 px-lg-5">
          <div class="search-bar-container">
            <b-input-group class="mb-3">
              <b-form-input
                v-model="search"
                type="search"
                placeholder="მოძებნე..."
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="books-row">
            <div class="row">
              <BookCard
                v-for="book in matchingBooks"
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

  data() {
    return {
      search: '',
    }
  },

  computed: {
    ...mapGetters('books', ['allBooks']),

    matchingBooks: function () {
      return this.allBooks.filter((book) => {
        return (
          book.title.toLowerCase().includes(this.search.toLowerCase()) ||
          book.author.toLowerCase().includes(this.search.toLowerCase())
        )
      })
    },
  },

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

  .search-bar-container {
    input {
      border-width: 2px;
      border-radius: 20px;
      padding: 15px;
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
