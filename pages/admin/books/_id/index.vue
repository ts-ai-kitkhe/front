<template>
  <div class="admin-pages-container">
    <AdminPagesHeader :show-header-buttons="!reorderMode">
      <transition name="fade">
        <button v-show="reorderMode" class="save-changes-btn">
          ცვლილებების შენახვა
        </button>
      </transition>
    </AdminPagesHeader>
    <div v-if="adminBookById" class="main-content">
      <div class="container-fluid pages-fluid">
        <div class="book-info">
          <div class="description">
            <h1 class="title">{{ adminBookById.title }}</h1>
            <h2 class="author">{{ adminBookById.author }}</h2>
          </div>
        </div>
        <div v-if="pageImages.length === 0" class="dropzone-panel">
          <VueDropzone></VueDropzone>
        </div>
        <VueDraggable
          v-else
          :list="pageImages"
          class="row pages-row"
          ghost-class="ghost"
          @change="pagesReordered"
        >
          <div
            v-for="(src, i) in pageImages"
            :key="i"
            class="page-card-container col-xl-2 col-lg-3 col-md-4"
          >
            <div class="card-details">
              <NuxtLink
                :to="`${i + 1}`"
                append
                class="page-name"
                :style="[reorderMode ? { 'pointer-events': 'none' } : {}]"
              >
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
                    title="გვერდის წაშლა"
                    cancel-title="გაუქმება"
                    ok-title="დიახ"
                  >
                    <p>დარწმუნებული ხართ, რომ გსურთ გვერდის წაშლა?</p>
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
          :imgs="pageImages"
          :index="index"
          @hide="handleHide"
        ></VueEasyLightbox>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VueDropzone from '../../../../components/dropzone.vue'

export default {
  components: {
    VueDropzone,
  },

  layout: 'operator',

  data() {
    return {
      visible: false,
      index: 0,
      pageImages: [
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
      reorderMode: false,
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

    pagesReordered() {
      this.reorderMode = true
    },
  },
}
</script>

<style lang="scss">
.admin-pages-container {
  .save-changes-btn {
    $dark-blue: #0069d9;
    $light-blue: #007bff;

    color: white !important;
    background-color: $light-blue !important;
    padding: 6px 10px !important;
    margin: 0 5px;
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
      background-color: $dark-blue !important;
    }

    &:active {
      background-color: #0062cc;
    }

    &:focus {
      box-shadow: 0 0 0 0.2rem rgb(38 143 255 / 50%);
    }
  }

  .main-content {
    margin-top: 80px;
    padding: 0 3vw;

    .book-info {
      text-align: center;

      .description {
        .author {
          font-weight: 300;
        }
      }
    }

    .dropzone-panel {
      margin: 10px auto;
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;

      .dropzone {
        border: none;
        width: 100%;
        height: 100%;
      }
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
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
