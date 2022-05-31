<template>
  <div class="feed-container">
    <div class="container-fluid cover-img-container p-0 my-3">
      <div class="row-fluid">
        <img
          src="~/assets/images/no_img.png"
          alt="feed-cover"
          class="cover-img"
        />
      </div>
    </div>
    <div class="container-md carousel-container">
      <div class="details my-3">
        <h2>ბოლოს დამატებული</h2>
        <NuxtLink to="/books" class="link-btn">ნახე მეტი</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'catalogue',
}
</script>

<style lang="scss" scoped>
.feed-container {
  .cover-img-container {
    .cover-img {
      width: 100%;
    }
  }

  .carousel-container {
    .details {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        font-size: 18px;
      }
    }
  }
}
</style>
