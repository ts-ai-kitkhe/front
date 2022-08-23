<template>
  <NuxtLink :to="`/books/${cardInfo.Id}`" class="swiper-card-container">
    <div class="card">
      <img
        v-if="cardInfo.coverImagePath"
        :src="`https://assets.ts-ai-kitkhe.ge/${cardInfo.coverImagePath}`"
        alt="Book Card Image"
      />
      <img v-else src="~/assets/images/no_cover.webp" alt="Book Card Image" />
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
        font-size: 20px;
        font-family: $geo-font-primary-bold;
      }

      h6 {
        font-size: 20px;
        font-family: $geo-font-primary-light;
      }
    }

    &:hover {
      transform: scale(1);
    }
  }
}
</style>
