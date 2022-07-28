<template>
  <NuxtLink :to="`/books/${cardInfo.id}`" class="swiper-card-container">
    <div class="card">
      <img :src="cardInfo.image" alt="Book Card Image" />
      <div class="card-body">
        <h5>{{ cardInfo.title }}</h5>
        <h6>{{ cardInfo.author }}</h6>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    cardInfo: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
.swiper-card-container {
  color: $txt-color-main;
  text-decoration: none;

  .card {
    width: 10rem;
    border: none;
    background-color: transparent;
    transform: scale(0.95);
    transition: all 0.15s ease-out;

    .card-body {
      text-align: center;

      h5 {
        font-size: 18px;
      }

      h6 {
        font-size: 16px;
        font-weight: 200;
      }
    }

    &:hover {
      transform: scale(1);
    }
  }
}
</style>
