<template>
  <div class="admin-books-container page-container">
    <AdminBooksHeader />
    <div class="main-content content-wrap">
      <div class="container">
        <h1 class="my-5">ჩემი წიგნები</h1>
        <div class="search-bar-wrapper">
          <SearchBar />
        </div>
        <div class="row row-3 mt-4">
          <AdminBookCard
            v-for="book in allAdminBooks"
            :key="book.id"
            :admin-book="book"
          />
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: mapGetters('admin', ['allAdminBooks']),

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
    margin-top: 80px;

    h1 {
      text-align: center;
    }

    .search-bar-wrapper {
      margin: 0 20px;
    }

    .row {
      align-items: center;
    }
  }
}
</style>
