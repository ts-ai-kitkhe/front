<template>
  <div class="admin-pages-container page-container">
    <AdminPagesHeader />
    <div v-if="adminBookById" class="main-content content-wrap">
      <div class="container-fluid pages-fluid">
        <div class="book-info">
          <div class="description">
            <h1 class="title">{{ adminBookById.title }}</h1>
            <h2 class="author">{{ adminBookById.author }}</h2>
          </div>
        </div>
        <div class="row pages-row">
          <AdminPageCard
            v-for="n in pagesCount"
            :key="n"
            class="col-lg-2 col-md-3 col-sm-4"
            :page-info="n"
          />
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      pagesCount: 25,
      adminBookId: this.$route.params.id,
    }
  },

  computed: mapGetters('admin', ['adminBookById']),

  created() {
    this.getAdminBookById(this.adminBookId)
  },

  methods: {
    ...mapActions('admin', ['getAdminBookById']),
  },
}
</script>

<style lang="scss" scoped>
.admin-pages-container {
  .main-content {
    margin-top: 80px;
    padding: 0 3vw;

    .book-info {
      text-align: center;
    }

    .pages-row {
      padding: 30px 0 100px;
    }
  }
}
</style>
