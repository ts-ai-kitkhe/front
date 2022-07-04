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
        <VueDraggable :list="imgs" class="row pages-row" ghost-class="ghost">
          <div
            v-for="(src, i) in imgs"
            :key="i"
            class="page-card-container col-lg-2 col-md-3 col-sm-4"
          >
            <div class="card-details">
              <NuxtLink :to="`${i + 1}`" append class="page-name">
                {{ src.length > 13 ? '...' + src.slice(-10) : src }}
              </NuxtLink>
              <div class="page-wrapper">
                <div class="trash-icon">
                  <b-btn v-b-modal="i + 1 + '-delete'">
                    <b-icon icon="trash"></b-icon>
                  </b-btn>
                  <b-modal
                    :id="i + 1 + '-delete'"
                    centered
                    title="Are you sure?"
                  >
                    <p>Some text</p>
                  </b-modal>
                </div>
                <img
                  :src="src"
                  alt="Page"
                  class="page-img"
                  @click="() => showImg(i)"
                />
                <p class="page-num">{{ i + 1 }}</p>
              </div>
            </div>
          </div>
        </VueDraggable>
        <VueEasyLightbox
          :visible="visible"
          :imgs="imgs"
          :index="index"
          @hide="handleHide"
        ></VueEasyLightbox>
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
      visible: false,
      index: 0,
      imgs: [
        require('~/assets/images/test1.jpg'),
        require('~/assets/images/test2.jpg'),
        require('~/assets/images/test3.jpg'),
        require('~/assets/images/test1.jpg'),
        require('~/assets/images/test2.jpg'),
        require('~/assets/images/test3.jpg'),
        require('~/assets/images/test1.jpg'),
        require('~/assets/images/test2.jpg'),
        require('~/assets/images/test3.jpg'),
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

    showImg(index) {
      this.index = index
      this.visible = true
    },

    handleHide() {
      this.visible = false
    },
  },
}
</script>

<style lang="scss">
.admin-pages-container {
  .main-content {
    margin-top: 80px;
    padding: 0 3vw;

    .book-info {
      text-align: center;
    }

    .pages-row {
      padding: 30px 0 100px;
      align-items: center;
    }

    .ghost {
      opacity: 0.5;
    }
  }

  .page-card-container {
    padding: 20px;

    .card-details {
      text-align: center;
      padding: 10px 0;

      .page-name {
        color: rgb(51, 127, 139);
      }

      .page-wrapper {
        position: relative;
        width: 90%;
        margin: 10px auto;

        .trash-icon {
          position: absolute;
          top: 0;
          right: 0;
          background-color: white;
          padding-top: 3px;
          visibility: hidden;
          opacity: 0;
          transition: 0.15s ease-out;
          display: flex;
          align-items: center;
          justify-content: center;

          button {
            background: none;
            border: none;
            color: black;

            .btn {
              padding: 0;
            }

            svg {
              color: black;
            }
          }

          .btn-secondary {
            padding: 3px 6px;

            &:active,
            &:focus {
              box-shadow: none;
            }
          }
        }

        .page-img {
          padding: 30px 15px;
          width: 100%;
          cursor: zoom-in;
          box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
            rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
            rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
        }

        .page-num {
          margin: 0;
          position: absolute;
          width: 100%;
          line-height: 18px;
          font-size: 18px;
          bottom: 10px;
        }

        &:hover {
          .trash-icon {
            visibility: visible;
            opacity: 1;
          }
        }
      }
    }
  }

  .vel-img-wrapper {
    transition: 0.1s linear !important;
  }
}
</style>
