<template>
  <div class="feed-container content-wrap">
    <div class="container-fluid cover-img-container p-0">
      <div class="row-fluid">
        <img
          src="~/assets/images/no_img.png"
          alt="feed-cover"
          class="cover-img"
        />
      </div>
    </div>
    <div class="container-xl books-swiper">
      <div class="details">
        <h2>ბოლოს დამატებული</h2>
        <NuxtLink to="/books" class="link-btn">ნახე მეტი</NuxtLink>
      </div>
      <div class="swiper">
        <div class="swiper-wrapper">
          <div v-for="book in booksData" :key="book.id" class="swiper-slide">
            <book-card :book-info="book" />
          </div>
        </div>
      </div>
      <div class="swiper-btn swiper-button-prev"></div>
      <div class="swiper-btn swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import { Swiper, Navigation } from 'swiper'
import 'swiper/swiper-bundle.min.css'

import { books } from '@/assets/dummydata.js'

export default {
  layout: 'catalogue',

  data() {
    return {
      booksData: books,
    }
  },

  mounted() {
    Swiper.use([Navigation])
    /* eslint-disable no-unused-vars */
    const swiper = new Swiper('.swiper', {
      direction: 'horizontal',
      loop: true,
      slidesPerView: 1,
      modules: [Navigation],
      breakpoints: {
        480: {
          slidesPerView: 2,
        },
        700: {
          slidesPerView: 3,
        },
        950: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  },
}
</script>

<style lang="scss" scoped>
.feed-container {
  .cover-img-container {
    .cover-img {
      margin: 10px 0 50px;
      width: 100%;
    }
  }

  .books-swiper {
    position: relative;

    .details {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0;

      h2 {
        font-size: 18px;
      }
    }

    .swiper {
      overflow: hidden;
      position: relative;
      width: 100%;
      margin: 50px 0;

      .swiper-wrapper {
        .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
          height: auto;
        }
      }
    }

    .swiper-btn {
      position: absolute;
      color: black;
      top: 50%;

      &.swiper-button-prev {
        left: -20px;

        @include lg {
          left: 10px;
        }
      }

      &.swiper-button-next {
        right: -20px;

        @include lg {
          right: 10px;
        }
      }
    }
  }
}
</style>
