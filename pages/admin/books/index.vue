<template>
  <div class="admin-books-container">
    <div class="container">
      <h1 class="my-5">ჩემი წიგნები</h1>
      <div class="row">
        <admin-book-card
          v-for="book in allAdminBooks"
          :key="book.id"
          :admin-book="book"
        />
      </div>
    </div>
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
  h1 {
    text-align: center;
  }

  .row {
    align-items: center;
  }
}
</style>
