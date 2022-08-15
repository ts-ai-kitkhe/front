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
            <b-btn v-b-modal="modalId() + '-t'">
              <b-icon icon="pencil-square"></b-icon>
            </b-btn>
            <b-modal
              :id="modalId() + '-t'"
              :ref="modalRef('bookModal')"
              centered
              title="მონაცემების შეცვლა"
              cancel-title="გაუქმება"
              ok-title="დადასტურება"
              :ok-disabled="isDisabled"
              @ok="updateBook"
            >
              <b-form>
                <b-form-group label="სათაური" label-for="title">
                  <b-form-input
                    id="title"
                    :ref="modalRef('bookTitle')"
                    v-model="title"
                    class="title-input"
                    :state="titleState"
                    required
                  />
                </b-form-group>
                <b-form-group label="ავტორი">
                  <VueSelect
                    v-model="authorInput"
                    :options="
                      allAuthors.filter(
                        (value, index, self) => self.indexOf(value) === index
                      )
                    "
                    class="vue-select-author"
                    taggable
                    @input="setSelectedAuthor"
                  ></VueSelect>
                </b-form-group>
                <b-form-group label="გამოცემის წელი" label-for="year-input">
                  <b-form-input
                    id="year-input"
                    :ref="modalRef('bookYear')"
                    v-model="year"
                    class="year-input"
                    type="number"
                    min="1"
                    max="2025"
                    step="1"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    :state="yearState"
                    required
                    :value="adminBook.year"
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="მთავარი სურათი" label-for="cover-image">
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
            <b-btn v-b-modal="modalId() + '-b'">
              <b-icon icon="trash"></b-icon>
            </b-btn>
            <b-modal
              :id="modalId() + '-b'"
              centered
              title="წიგნის წაშლა"
              cancel-title="გაუქმება"
              ok-title="დიახ"
              @ok="deleteBook"
            >
              <p>დარწმუნებული ხართ, რომ გსურთ წიგნის წაშლა?</p>
            </b-modal>
          </div>
        </div>
        <div class="card-body">
          <NuxtLink :to="`${adminBook.Id}`" append class="admin-book-link">
            <h5>{{ adminBook.title | truncateStr }}</h5>
            <h6>{{ adminBook.authorName | truncateStr }}</h6>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  filters: {
    truncateStr: function (value) {
      const maxSize = 34
      if (value && value.length > maxSize) {
        value = value.substring(0, maxSize - 3) + '...'
      }
      return value
    },
  },

  props: {
    adminBook: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      visibility: 'Private',
      authorInput: this.adminBook.authorName,
      authorState: null,
      isDisabled: false,
      title: this.adminBook.title,
      titleState: null,
      year: this.adminBook.year,
      yearState: null,
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
      return 'modal-' + this.adminBook.Id
    },

    modalRef(title) {
      return title + this.adminBook.id
    },

    ...mapActions('admin', ['getAllAuthors']),
    ...mapMutations('admin', ['updateAdminBook']),
    ...mapMutations('admin', ['deleteAdminBook']),

    setSelectedAuthor(value) {
      this.authorInput = value
    },

    updateBook(bvModalEvent) {
      bvModalEvent.preventDefault()
      const isValid = this.checkFormValidity()
      if (isValid) {
        this.isDisabled = true
        this.submitBook()
      }
    },

    checkFormValidity() {
      this.titleState = this.$refs[this.modalRef('bookTitle')].checkValidity()
      this.authorState = this.authorInput !== null
      this.yearState = this.$refs[this.modalRef('bookYear')].checkValidity()
      return this.titleState && this.authorState && this.yearState
    },

    async submitBook() {
      const data = {
        id: this.adminBook.Id,
        title: this.title,
        authorName: this.authorInput,
        year: this.year,
      }

      const response = await axios.post(
        `https://api.ts-ai-kitkhe.ge/core/books/${this.adminBook.Id}`,
        data
      )

      this.$refs[this.modalRef('bookModal')].hide()
      this.updateAdminBook(response.data)
      this.isDisabled = false
      this.titleState = this.authorState = this.yearState = null
    },

    async deleteBook() {
      await axios.delete(
        `https://api.ts-ai-kitkhe.ge/core/books/${this.adminBook.Id}`,
        {}
      )
      this.deleteAdminBook(this.adminBook.Id)
    },
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
          font-weight: 400;
        }

        h6 {
          transition: 0.1s ease-out;
          font-size: 16px;
          font-weight: 300;
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

.year-input {
  color: #333333;
}
</style>
