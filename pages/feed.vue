<template>
  <div v-if="initialized" class="feed-container content-wrap">
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
          <div
            v-for="card in allSwiperCards"
            :key="card.id"
            class="swiper-slide"
          >
            <swiper-card :card-info="card" />
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
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'catalogue',

  data() {
    return {
      initialized: false,
    }
  },

  computed: mapGetters('swiper', ['allSwiperCards']),

  mounted() {
    this.getSwiperCards().then(() => {
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
    })
    this.initialized = true
  },

  methods: {
    ...mapActions('swiper', ['getSwiperCards']),
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
      margin: 20px 0;

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
