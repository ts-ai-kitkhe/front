<template>
  <div class="col-lg-3 col-md-4 col-sm-4 col-7 my-3">
    <NuxtLink :to="`/books/${bookInfo.id}`" class="book-card-container">
      <div class="card">
        <img :src="bookInfo.image" alt="Book Card Image" />
        <div class="card-body">
          <h5>{{ bookInfo.title }}</h5>
          <h6>{{ bookInfo.author }}</h6>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    bookInfo: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
.book-card-container {
  color: $txt-color-main;
  text-decoration: none;

  .card {
    border: none;
    background-color: transparent;
    transform: scale(0.95);
    transition: all 0.15s ease-out;

    img {
      width: 100%;
    }

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
