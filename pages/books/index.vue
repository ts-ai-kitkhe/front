<template>
  <div class="books-container content-wrap">
    <div class="container my-3">
      <div class="row books-cover-row">
        <div class="books-cover-wrapper">
          <img
            src="~/assets/images/cover_bg.webp"
            alt="Books Feed Cover"
            class="books-cover"
          />
          <div class="books-cover-txt">#იკითხექართულად</div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 px-lg-4">
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
    margin-bottom: 3rem;

    @include md {
      margin-bottom: 2rem;
    }

    .books-cover-wrapper {
      position: relative;
      width: 100%;
      height: 300px;

      .books-cover {
        width: 100%;
        object-fit: cover;
        height: 100%;
      }

      .books-cover-txt {
        position: absolute;
        font-family: 'BPG Boxo-Boxo', sans-serif;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 5vw;
        letter-spacing: 2px;
        cursor: default;

        @media screen and (max-width: 1400px) {
          font-size: 6.5vw;
        }

        @include xs {
          font-size: 8vw;
        }
      }

      @include sm {
        height: 200px;
      }
    }
  }

  .search-bar-container {
    input {
      border-width: 2px;
      border-radius: 20px;
      padding: 15px;
      border: 2px solid #37393d;
      background-color: #2f2f2f;
      color: white;

      &::placeholder {
        color: #929397;
        opacity: 1;
      }

      &:focus {
        border-color: #929397;
        box-shadow: none;
      }
    }

    @media screen and (max-width: 400px) {
      width: 80%;
      margin: 0 auto;
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
