<template>
  <div class="landing-wrapper">
    <section id="landing" class="landing-slide">
      <h1>წაიკითხე</h1>
      <a href="#feed" class="scroll-down"></a>
    </section>
    <section id="feed" class="feed-slide">Coming Soon...</section>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.landing-wrapper {
  section {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100%;
  }

  .landing-slide {
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
    background-color: seashell;
  }
}
</style>
