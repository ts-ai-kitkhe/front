<template>
  <div class="book-single-container">
    <div class="container">
      <div v-if="bookById" class="row">
        <div class="col-md-6">
          <div class="book-img-container">
            <img :src="bookById.image" alt="Book Image" class="book-img" />
          </div>
        </div>
        <div class="col-md-6 px-md-0 my-md-0 my-5 px-5">
          <div class="book-info">
            <h1>{{ bookById.title }}</h1>
            <h2>{{ bookById.author }}</h2>
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
      bookId: this.$route.params.id,
    }
  },

  computed: mapGetters('books', ['bookById']),

  created() {
    this.getBookById(this.bookId)
  },

  methods: {
    ...mapActions('books', ['getBookById']),
  },
}
</script>

<style lang="scss" scoped>
.book-single-container {
  padding-top: 70px;

  .book-img-container {
    display: flex;
    justify-content: center;

    .book-img {
      width: 80%;
    }
  }

  .book-info {
    h1 {
      font-size: 36px;
    }

    h2 {
      font-size: 28px;
      font-weight: 200;
    }
  }
}
</style>
