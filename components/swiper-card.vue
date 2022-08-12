<template>
  <NuxtLink :to="`/books/${cardInfo.id}`" class="swiper-card-container">
    <div class="card">
      <img v-if="cardInfo.image" :src="cardInfo.image" alt="Book Card Image" />
      <img v-else src="~/assets/images/no_cover.jpg" alt="Book Card Image" />
      <div class="card-body">
        <h5>{{ cardInfo.title | truncateStr }}</h5>
        <h6>{{ cardInfo.authorName | truncateStr }}</h6>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  filters: {
    truncateStr: function (value) {
      const maxSize = 26
      if (value && value.length > maxSize) {
        value = value.substring(0, maxSize - 3) + '...'
      }
      return value
    },
  },

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
  color: white;
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
