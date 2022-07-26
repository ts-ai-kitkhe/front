<template>
  <div class="page-container">
    <div class="landing-wrapper">
      <section id="landing" class="landing-slide">
        <div class="landing-texts">
          <h1 class="title-en">
            <span class="no-blink">ts</span>
            <span class="blink-ai">ai</span>
            <span class="no-blink">kitkhe</span>
          </h1>
        </div>
        <a class="scroll-down" @click="scrollDown"></a>
      </section>
      <section id="feed" ref="feedSlide" class="feed-slide">
        <TheHeader />
        <div class="feed-container content-wrap">
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
                  <SwiperCard :card-info="card" />
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
        <TheFooter />
      </section>
    </div>
  </div>
</template>

<script>
import { Swiper, Navigation, Autoplay } from 'swiper'
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
      Swiper.use([Navigation, Autoplay])
      /* eslint-disable no-unused-vars */
      const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        threshold: 20,
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
        autoplay: {
          delay: 2000,
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
    position: relative;

    .landing-texts {
      color: white;
      display: flex;
      width: 80%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto;

      $dark-gray-color: #353535;
      $yellow-color: #efc137;

      .title-en {
        display: flex;
        letter-spacing: 5px;
        color: white;
        font-size: 15vw;
        transform: scale(0.92);
        animation: scale-title 2s forwards cubic-bezier(0.5, 1, 0.89, 1);

        .no-blink {
          opacity: 0;
          filter: blur(4px);
        }

        .blink-ai {
          position: relative;
          opacity: 0;
          animation: blink 1.5s infinite alternate,
            fade-in 0.8s 0.2s forwards cubic-bezier(0.11, 0, 0.5, 0);
          color: $dark-gray-color;

          &:after {
            position: absolute;
            top: 0;
            left: 0;
            filter: blur(5px);
            content: 'ai';
            animation: blink 1.5s infinite alternate;

            @include md {
              filter: blur(1px);
            }
          }
        }

        span {
          &:nth-child(1) {
            animation: fade-in 0.8s 0.1s forwards cubic-bezier(0.11, 0, 0.5, 0);
          }

          &:nth-child(3) {
            animation: fade-in 0.8s 0.3s forwards cubic-bezier(0.11, 0, 0.5, 0);
          }
        }

        @keyframes scale-title {
          100% {
            transform: scale(1);
          }
        }

        @keyframes fade-in {
          100% {
            opacity: 1;
            filter: blur(0);
          }
        }

        @include md {
          font-size: 18vw;
        }
      }

      @keyframes blink {
        45% {
          color: $yellow-color;
        }
        50% {
          color: $dark-gray-color;
        }
        65% {
          color: $yellow-color;
        }
        100% {
          color: $dark-gray-color;
        }
      }
    }

    .scroll-down {
      height: 50px;
      width: 50px;
      border: 2px solid #a0a0a0;
      position: absolute;
      bottom: 5vh;
      border-radius: 50px;
      cursor: pointer;
      animation: fade-in-btn 0.8s 1s forwards cubic-bezier(0.11, 0, 0.5, 0);
      opacity: 0;
      filter: blur(4px);
      transition: all 0.2s ease-out;

      &:hover {
        border-color: white;
      }

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

      @keyframes fade-in-btn {
        100% {
          opacity: 1;
          filter: blur(0);
        }
      }

      @include md {
        bottom: 15vh;
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
