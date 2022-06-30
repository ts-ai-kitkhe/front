<template>
  <div class="page-card-container">
    <NuxtLink :to="`${pageInfo.order}`" append>
      <div class="card-details">
        <h6 class="page-name">{{ strippedName }}</h6>
        <img src="~/assets/images/test.jpg" alt="Page" class="page-img" />
        <p class="page-num">{{ pageInfo.order }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    pageInfo: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      pageName: this.pageInfo.name + '.jpg',
    }
  },

  computed: {
    strippedName: function () {
      if (this.pageName.length > 13) {
        return '...' + this.pageName.slice(-10)
      }
      return this.pageName
    },
  },
}
</script>

<style lang="scss" scoped>
.page-card-container {
  padding: 20px;

  a {
    text-decoration: none;
    color: black;

    .card-details {
      border: 1px solid black;
      text-align: center;

      .page-name {
        padding: 10px 0;
        color: rgb(51, 127, 139);
      }

      .page-img {
        width: 100%;
      }
    }
  }
}
</style>
