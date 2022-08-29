<template>
  <div class="admin-pages-container">
    <AdminPagesHeader :show-header-buttons="!reorderMode">
      <transition name="fade">
        <button
          v-show="reorderMode"
          ref="saveChangesBtn"
          class="save-changes-btn"
          @click="saveChanges"
        >
          ცვლილებების შენახვა
        </button>
      </transition>
    </AdminPagesHeader>
    <div v-if="adminBookById" class="main-content">
      <div class="container-fluid pages-fluid">
        <div class="book-info">
          <div class="description">
            <h1 class="title">{{ adminBookById.title }}</h1>
            <h2 class="author">{{ adminBookById.authorName }}</h2>
            <h3 class="year">{{ adminBookById.year }} წელი</h3>
          </div>
        </div>
        <div v-if="adminBookPages.length === 0" class="dropzone-panel">
          <VueDropzone :book-id="adminBookId"></VueDropzone>
        </div>
        <VueDraggable
          v-else
          v-model="adminBookPages"
          class="row pages-row"
          ghost-class="ghost"
          @change="pagesReordered"
        >
          <div
            v-for="(page, i) in adminBookPages"
            :key="i"
            class="page-card-container col-xl-2 col-lg-3 col-md-4"
          >
            <div class="card-details">
              <NuxtLink
                :to="{
                  path: generatePath(page.url),
                  query: { ext: generateQueryParam(page.url) },
                }"
                append
                class="page-name"
                :style="[reorderMode ? { 'pointer-events': 'none' } : {}]"
              >
                {{ page.url | truncateUrl }}
              </NuxtLink>
              <div class="page-wrapper">
                <div class="trash-icon">
                  <b-btn v-show="!reorderMode" v-b-modal="page.url">
                    <b-icon icon="trash"></b-icon>
                  </b-btn>
                  <b-modal
                    :id="page.url"
                    centered
                    title="გვერდის წაშლა"
                    cancel-title="გაუქმება"
                    ok-title="დიახ"
                    @ok="deletePage"
                  >
                    <p>დარწმუნებული ხართ, რომ გსურთ გვერდის წაშლა?</p>
                  </b-modal>
                </div>
                <img
                  :src="page.url"
                  alt=""
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
          :imgs="adminBookPages.map((page) => page.url)"
          :index="index"
          @hide="handleHide"
        ></VueEasyLightbox>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import VueDropzone from '../../../../components/dropzone.vue'

export default {
  components: {
    VueDropzone,
  },

  filters: {
    truncateUrl: function (url) {
      const maxSize = 18
      url = url.split('/').pop()
      return url.length > maxSize ? '...' + url.slice(-1 * (maxSize - 3)) : url
    },
  },

  layout: 'operator',

  data() {
    return {
      visible: false,
      index: 0,
      adminBookId: this.$route.params.id,
      reorderMode: false,
    }
  },

  head() {
    return {
      title: 'Admin',
    }
  },

  computed: {
    ...mapGetters('admin', ['adminBookById']),

    adminBookPages: {
      get() {
        return this.$store.state.admin.adminBookPages
      },

      set(value) {
        this.$store.commit('admin/setAdminBookPages', value)
      },
    },
  },

  created() {
    this.getAdminBookById(this.adminBookId)
    this.getAdminBookPages(this.adminBookId)
  },

  methods: {
    ...mapActions('admin', ['getAdminBookById']),
    ...mapActions('admin', ['getAdminBookPages']),
    ...mapMutations('admin', ['deleteAdminBookPage']),

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

    generatePath(url) {
      const filename = url.split('/').pop()
      return filename.slice(0, filename.lastIndexOf('.'))
    },

    generateQueryParam(url) {
      return url.split('/').pop().split('.').pop()
    },

    async deletePage(bvModalEvent) {
      const url = bvModalEvent.componentId
      const filename = url.split('/').pop()

      await axios.delete(
        `https://api.ts-ai-kitkhe.ge/core/admin/books/${this.adminBookId}/pages/${filename}`,
        {
          headers: {
            authorization:
              'Bearer ' +
              this.$auth.strategies.cognito.token.session.idToken.jwtToken,
          },
        }
      )

      this.deleteAdminBookPage(url)
      this.saveChanges()
    },

    async saveChanges() {
      const pages = this.$store.state.admin.adminBookPages.map((page) =>
        page.url.split('/').pop()
      )

      await axios.patch(
        `https://api.ts-ai-kitkhe.ge/core/admin/books/${this.adminBookId}/pages`,
        { pages },
        {
          headers: {
            authorization:
              'Bearer ' +
              this.$auth.strategies.cognito.token.session.idToken.jwtToken,
          },
        }
      )

      this.$refs.saveChangesBtn.style.display = 'none'
      this.reorderMode = false
    },
  },
}
</script>

<style lang="scss">
.admin-pages-container {
  .save-changes-btn {
    $dark-blue: #0069d9;
    $light-blue: $admin-blue;

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
        .title {
          font-weight: 400;
          font-size: 36px;
          letter-spacing: 1px;
        }

        .author {
          font-weight: 300;
          font-size: 31px;
          margin: 15px;
          letter-spacing: 1px;
        }

        .year {
          font-weight: 200;
          font-size: 22px;
          letter-spacing: 1px;
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
      padding: 20px 0 100px;
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
        transition: 0.15s ease-out;

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
          padding: 20px 15px 35px;
          width: 100%;
          cursor: zoom-in;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 5px;
          transition: 0.1s ease-out;

          &:hover {
            box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 10px;
          }
        }

        .page-num {
          margin: 0;
          position: absolute;
          width: 100%;
          line-height: 18px;
          font-size: 16px;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
