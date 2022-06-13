<template>
  <div class="landing-wrapper">
    <section id="landing" class="landing-slide">
      <h1>წაიკითხე</h1>
      <a class="scroll-down" @click="scrollDown"></a>
    </section>
    <section id="feed" ref="feedSlide" class="feed-slide">
      <the-header />
      <div class="feed-container">
        <div class="container-fluid cover-img-container p-0">
          <div class="row-fluid">
            <img
              src="~/assets/images/no_img.png"
              alt="Main Feed Cover"
              class="cover-img mb-5"
            />
          </div>
        </div>
        <div v-if="initialized" class="container-xl books-swiper">
          <div class="details mb-5">
            <h2>ბოლოს დამატებული</h2>
            <NuxtLink to="/books" class="link-btn">ნახე მეტი</NuxtLink>
          </div>
          <div class="swiper mb-2">
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
        <div v-else class="text-center">
          <b-spinner></b-spinner>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Swiper, Navigation } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import { mapActions, mapGetters } from 'vuex'

export default {
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

    scrollDown() {
      this.$refs.feedSlide.scrollIntoView({ behavior: 'smooth' })
    },
  },
}
</script>

<style lang="scss" scoped>
.landing-wrapper {
  section {
    min-height: 100vh;
  }

  .landing-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: black;

    h1 {
      font-size: 15vw;
      color: white;

      @include md {
        font-size: 18vw;
      }
    }

    .scroll-down {
      height: 50px;
      width: 50px;
      border: 2px solid white;
      position: absolute;
      bottom: 5vh;
      border-radius: 50px;
      cursor: pointer;

      &:before,
      &:after {
        content: '';
        position: absolute;
        top: 20%;
        left: 50%;
        height: 13px;
        width: 13px;
        transform: translate(-50%, -100%) rotate(45deg);
        border: 2px solid white;
        border-top: transparent;
        border-left: transparent;
        animation: scroll-down 1s ease-in-out infinite;
      }

      &:before {
        top: 20%;
        animation-delay: 0.2s;
      }

      @keyframes scroll-down {
        0% {
          opacity: 0;
        }
        30% {
          opacity: 1;
        }
        60% {
          opacity: 1;
        }
        100% {
          top: 90%;
          opacity: 0;
        }
      }
    }
  }

  .feed-slide {
    .feed-container {
      .cover-img-container {
        .cover-img {
          width: 100%;
        }
      }

      .books-swiper {
        position: relative;

        .details {
          display: flex;
          align-items: center;
          justify-content: space-between;

          h2 {
            font-size: 18px;
          }
        }

        .swiper {
          overflow: hidden;
          position: relative;
          width: 100%;

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
  }
}
</style>
