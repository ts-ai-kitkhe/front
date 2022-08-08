<template>
  <div class="book-single-container">
    <div class="container">
      <div v-if="bookById" class="row">
        <div class="col-md-6">
          <div class="book-img-container">
            <img
              v-if="bookById.image"
              :src="bookById.image"
              alt="Book Image"
              class="book-img"
            />
            <img
              v-else
              src="~/assets/images/no_cover.jpg"
              alt="Book Image"
              class="book-img"
            />
          </div>
        </div>
        <div class="col-md-6 px-md-0 my-md-0 my-5 px-5">
          <div class="text-center text-md-left">
            <div class="book-info">
              <h1>{{ bookById.title }}</h1>
              <h2>{{ bookById.author }}</h2>
            </div>
            <div class="progress-circle">
              <VueProgress
                stroke-color="green"
                :transition-duration="2000"
                :radius="55"
                :stroke-width="10"
                value="83.13"
              >
              </VueProgress>
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

  .progress-circle {
    margin: 30px 0 20px;
    display: flex;

    @include sm {
      justify-content: center;
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
      transition: 0.1s ease-out;

      &:hover {
        color: black;
        background-color: white;
        font-weight: 500;
      }

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
