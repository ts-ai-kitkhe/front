<template>
  <div class="col-lg-3 col-md-4 col-sm-6">
    <div class="admin-book-card-container mx-4 my-2">
      <div class="card px-4 px-sm-0">
        <div class="img-wrapper">
          <img
            v-if="adminBook.image"
            :src="adminBook.image"
            alt="Book Card Image"
          />
          <img
            v-else
            src="~/assets/images/no_cover.jpg"
            alt="Book Card Image"
          />
          <div class="pencil-icon">
            <b-btn v-b-modal="modalId() + '-r'">
              <b-icon icon="pencil-square"></b-icon>
            </b-btn>
            <b-modal
              :id="modalId() + '-r'"
              centered
              title="მონაცემების შეცვლა"
              cancel-title="გაუქმება"
              ok-title="დადასტურება"
            >
              <b-form action="" method="">
                <b-form-group label="სათაური" label-for="title">
                  <b-form-input
                    id="title"
                    :value="adminBook.title"
                    class="title-input"
                  />
                </b-form-group>
                <b-form-group label="ავტორი">
                  <VueSelect
                    :options="
                      allAuthors.filter(
                        (value, index, self) => self.indexOf(value) === index
                      )
                    "
                    class="vue-select-author"
                    taggable
                  ></VueSelect>
                </b-form-group>
                <b-form-group
                  label="მთავარი სურათის შეცვლა"
                  label-for="cover-image"
                >
                  <b-form-file
                    id="cover-image"
                    required
                    accept=".png, .jpg, .jpeg"
                  ></b-form-file>
                </b-form-group>
                <b-form-group label="საჯაროობა">
                  <b-form-radio v-model="visibility" value="Private">
                    <span>Private</span>
                  </b-form-radio>
                  <b-form-radio v-model="visibility" value="Public">
                    <span>Public</span>
                  </b-form-radio>
                </b-form-group>
              </b-form>
            </b-modal>
          </div>
          <div class="trash-icon">
            <b-btn v-b-modal="modalId() + '-l'">
              <b-icon icon="trash"></b-icon>
            </b-btn>
            <b-modal
              :id="modalId() + '-l'"
              centered
              title="წიგნის წაშლა"
              cancel-title="გაუქმება"
              ok-title="დიახ"
            >
              <p>დარწმუნებული ხართ, რომ გსურთ წიგნის წაშლა?</p>
            </b-modal>
          </div>
        </div>
        <div class="card-body">
          <NuxtLink :to="`${adminBook.id}`" append class="admin-book-link">
            <h5>{{ adminBook.title }}</h5>
            <h6>{{ adminBook.author }}</h6>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    adminBook: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      visibility: 'Private',
    }
  },

  computed: {
    ...mapGetters('admin', ['allAuthors']),
  },

  created() {
    this.getAllAuthors()
  },

  methods: {
    modalId() {
      return 'modal-' + this.adminBook.id
    },

    ...mapActions('admin', ['getAllAuthors']),
  },
}
</script>

<style lang="scss">
.admin-book-card-container {
  .card {
    border: none;

    .img-wrapper {
      position: relative;

      img {
        width: 100%;
        transition: 0.1s ease-out;
      }

      $svg-dimension: 18px;
      $btn-padding: 2px;

      .pencil-icon,
      .trash-icon {
        position: absolute;
        right: 0;
        background-color: white;
        padding: $btn-padding;
        visibility: hidden;
        opacity: 0;
        transition: 0.1s ease-out;
        width: 1.6 * $svg-dimension;
        height: 1.6 * $svg-dimension;
        display: flex;
        justify-content: center;
        align-items: center;

        button {
          background: none;
          border: none;
          color: black;

          .btn {
            padding: 0;
          }

          svg {
            color: black;
            width: $svg-dimension;
            height: $svg-dimension;
          }
        }

        .btn-secondary {
          padding: 2px 5px;
        }
      }

      .pencil-icon {
        top: 0;
        border-bottom: none;
      }

      .trash-icon {
        top: $svg-dimension + 2 * $btn-padding + 5px;
      }

      &:hover {
        img {
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 20px;
        }

        .pencil-icon,
        .trash-icon {
          visibility: visible;
          opacity: 1;
        }
      }
    }

    .card-body {
      text-align: center;

      .admin-book-link {
        text-decoration: none;
        color: black;

        h5 {
          transition: 0.1s ease-out;
          font-size: 18px;
        }

        h6 {
          transition: 0.1s ease-out;
          font-size: 16px;
          font-weight: 200;
        }

        &:hover {
          h5 {
            color: $admin-blue;
          }

          h6 {
            color: rgb(100, 100, 100);
          }
        }
      }
    }
  }
}

.title-input {
  &.form-control {
    color: #333333 !important;
    padding: 0.375rem 0.55rem !important;
  }
}
</style>
