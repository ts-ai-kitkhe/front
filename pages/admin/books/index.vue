<template>
  <div class="admin-books-container">
    <AdminBooksHeader />
    <div class="main-content">
      <div class="container">
        <h1 class="my-5">ჩემი წიგნები</h1>
        <div class="search-bar-container">
          <b-input-group>
            <b-form-input
              v-model="search"
              type="search"
              placeholder="მოძებნე..."
            ></b-form-input>
          </b-input-group>
        </div>
        <div class="row">
          <AdminBookCard
            v-for="book in matchingAdminBooks"
            :key="book.Id"
            :admin-book="book"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'operator',

  data() {
    return {
      search: '',
    }
  },

  computed: {
    ...mapGetters('admin', ['allAdminBooks']),

    matchingAdminBooks: function () {
      return this.allAdminBooks.filter((book) => {
        return (
          book.title.toLowerCase().includes(this.search.toLowerCase()) ||
          book.authorName.toLowerCase().includes(this.search.toLowerCase()) ||
          book.year.toString().includes(this.search)
        )
      })
    },
  },

  created() {
    this.getAdminBooks()
  },

  methods: {
    ...mapActions('admin', ['getAdminBooks']),
  },
}
</script>

<style lang="scss" scoped>
.admin-books-container {
  .main-content {
    margin-top: 60px;
    margin-bottom: 50px;

    h1 {
      text-align: center;
      font-weight: 400;
      font-size: 36px;
      letter-spacing: 2px;
    }

    .search-bar-container {
      margin: 0 20px;
      margin-bottom: 30px;

      input {
        border-radius: 20px;
        padding: 15px;
      }
    }

    .row {
      align-items: baseline;
    }
  }
}
</style>
