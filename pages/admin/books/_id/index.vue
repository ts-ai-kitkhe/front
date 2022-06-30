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
        <VueDraggable :list="pages" class="row pages-row" ghost-class="ghost">
          <AdminPageCard
            v-for="page in pages"
            :key="page.order"
            class="col-lg-2 col-md-3 col-sm-4"
            :page-info="page"
          />
        </VueDraggable>
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
      pages: [
        {
          name: 'images/test1',
          order: 1,
        },
        {
          name: 'images/test2',
          order: 2,
        },
        {
          name: 'images/test3',
          order: 3,
        },
        {
          name: 'images/test4',
          order: 4,
        },
        {
          name: 'images/test5',
          order: 5,
        },
        {
          name: 'images/test6',
          order: 6,
        },
        {
          name: 'images/test7',
          order: 7,
        },
        {
          name: 'images/test8',
          order: 8,
        },
        {
          name: 'images/test9',
          order: 9,
        },
        {
          name: 'images/test10',
          order: 10,
        },
      ],
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

    .ghost {
      opacity: 0.5;
    }
  }
}
</style>
