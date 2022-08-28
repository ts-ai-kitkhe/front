<template>
  <div class="book-single-container">
    <div class="container">
      <div v-if="bookById" class="row">
        <div class="col-md-6">
          <div class="book-img-container">
            <img
              v-if="bookById.coverImagePath"
              :src="`https://assets.ts-ai-kitkhe.ge/${bookById.coverImagePath}`"
              alt="Book Image"
              class="book-img"
            />
            <img
              v-else
              src="~/assets/images/no_cover.webp"
              alt="Book Image"
              class="book-img"
            />
          </div>
        </div>
        <div class="col-md-6 px-md-0 my-md-0 my-5 px-5">
          <div class="text-center text-md-left">
            <div class="book-info">
              <h1>{{ bookById.title }}</h1>
              <h2>{{ bookById.authorName }}</h2>
              <h3>{{ bookById.year }} წელი</h3>
            </div>
            <div class="progress-circle">
              <VueProgress
                :stroke-color="
                  confidence < 0.5
                    ? 'red'
                    : confidence <= 0.75
                    ? 'orange'
                    : 'green'
                "
                :transition-duration="2000"
                :radius="55"
                :stroke-width="10"
                :value="(confidence * 100).toFixed(2)"
              >
              </VueProgress>
            </div>
            <div class="download-panel">
              <a
                v-if="bookById.bookPdfUrl"
                :href="bookById.bookPdfUrl"
                target="_blank"
              >
                <b-icon icon="download"></b-icon>
                <span>წიგნის გახსნა</span>
              </a>
              <a href="" target="_blank">
                <b-icon icon="download"></b-icon>
                <span>ტექსტის გახსნა</span>
              </a>
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
      confidence: Math.random(),
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
      font-size: 40px;
      font-family: $geo-font-primary-bold;
      margin: 0;

      @include sm {
        font-size: 30px;
      }
    }

    h2 {
      font-size: 35px;
      font-family: $geo-font-primary;
      margin: 15px 0 20px;

      @include sm {
        font-size: 25px;
      }
    }

    h3 {
      font-size: 30px;
      font-family: $geo-font-primary-light;
      margin: 0;

      @include sm {
        font-size: 20px;
      }
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
    margin-bottom: 20px;

    a {
      font-family: $geo-font-primary;
      width: 250px;
      margin: 10px 0;
      padding: 10px;
      color: white;
      background-color: transparent;
      border: 2px solid white;
      border-radius: 25px;
      transition: 0.1s ease-out;
      font-size: 20px;
      letter-spacing: 0.5px;
      text-align: center;
      text-decoration: none;

      &:hover {
        color: black;
        background-color: white;
        font-family: $geo-font-primary-bold;
      }

      svg {
        margin-right: 5px;
      }
    }

    @include sm {
      align-items: center;
    }
  }
}
</style>
