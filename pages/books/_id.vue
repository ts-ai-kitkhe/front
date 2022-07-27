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
          <div class="text-center text-md-left">
            <div class="book-info">
              <h1>{{ bookById.title }}</h1>
              <h2>{{ bookById.author }}</h2>
            </div>
            <div class="download-panel">
              <button>
                <b-icon icon="download"></b-icon>
                <span>Download 1</span>
              </button>
              <button>
                <b-icon icon="download"></b-icon>
                <span>Download 2</span>
              </button>
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
    margin-bottom: 20px;

    h1 {
      font-size: 36px;
    }

    h2 {
      font-size: 28px;
      font-weight: 200;
    }
  }

  .download-panel {
    display: flex;
    flex-direction: column;

    button {
      width: 250px;
      margin: 10px 0;
      padding: 10px;
      color: white;
      background-color: transparent;
      border: 2px solid white;
      border-radius: 25px;

      svg {
        margin-right: 3px;
      }
    }

    @include sm {
      align-items: center;
    }
  }
}
</style>
