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
  color: black;
  text-decoration: none;

  .card {
    border: none;

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
  }
}
</style>
