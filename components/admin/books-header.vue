<template>
  <header class="admin-header-container">
    <b-navbar toggleable="sm" fixed="top">
      <NuxtLink to="/#feed" class="navbar-brand">
        <img src="~/assets/images/logo.svg" alt="Logo" class="logo" />
        <span class="logo-text">წაიკითხე</span>
      </NuxtLink>
      <b-navbar-toggle target="header-collapse"></b-navbar-toggle>
      <b-collapse id="header-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <button v-b-modal.upload-book-modal>წიგნის ატვირთვა</button>
          <b-modal
            id="upload-book-modal"
            ref="bookModal"
            centered
            title="წიგნის ატვირთვა"
            cancel-title="გაუქმება"
            ok-title="დადასტურება"
            :ok-disabled="isDisabled"
            @ok="createBook"
          >
            <b-form>
              <b-form-group label="სათაური" label-for="title-input">
                <b-form-input
                  id="title-input"
                  ref="bookTitle"
                  v-model="title"
                  class="title-input"
                  :state="titleState"
                  required
                ></b-form-input>
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
                  :value="authorName"
                  @input="setSelectedAuthor"
                ></VueSelect>
              </b-form-group>
              <b-form-group label="გამოცემის წელი" label-for="year-input">
                <b-form-input
                  id="year-input"
                  ref="bookYear"
                  v-model="year"
                  class="year-input"
                  type="number"
                  min="1"
                  max="2025"
                  step="1"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  :state="yearState"
                  required
                ></b-form-input>
              </b-form-group>
            </b-form>
          </b-modal>
          <b-nav-item-dropdown :text="adminEmail" class="admin-dropdown">
            <b-dropdown-item v-b-modal.logout-modal>გამოსვლა</b-dropdown-item>
            <b-modal
              id="logout-modal"
              centered
              title="გამოსვლა"
              cancel-title="გაუქმება"
              ok-title="დიახ"
              @ok="$auth.logout()"
            >
              <p>დარწმუნებული ხართ, რომ გსურთ პროფილიდან გამოსვლა?</p>
            </b-modal>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      title: null,
      authorName: null,
      year: null,
      titleState: null,
      authorState: null,
      yearState: null,
      isDisabled: false,
    }
  },

  computed: {
    ...mapGetters('admin', ['adminEmail']),
    ...mapGetters('admin', ['allAuthors']),
  },

  created() {
    this.getAllAuthors()
  },

  methods: {
    ...mapActions('admin', ['getAllAuthors']),
    ...mapMutations('admin', ['addNewAdminBook']),

    setSelectedAuthor(value) {
      this.authorName = value
    },

    createBook(bvModalEvent) {
      bvModalEvent.preventDefault()
      const isValid = this.checkFormValidity()
      if (isValid) {
        this.isDisabled = true
        this.submitBook()
      }
    },

    checkFormValidity() {
      this.titleState = this.$refs.bookTitle.checkValidity()
      this.authorState = this.authorName !== null
      this.yearState = this.$refs.bookYear.checkValidity()
      return this.titleState && this.authorState && this.yearState
    },

    async submitBook() {
      const data = {
        title: this.title,
        authorName: this.authorName,
        year: this.year,
      }

      const response = await axios.post(
        'https://api.ts-ai-kitkhe.ge/core/books',
        data
      )

      this.addNewAdminBook(response.data)
      this.$refs.bookModal.hide()
      this.isDisabled = false
      this.title =
        this.authorName =
        this.year =
        this.titleState =
        this.authorState =
        this.yearState =
          null
    },
  },
}
</script>

<style lang="scss">
.admin-dropdown {
  .dropdown-toggle {
    display: flex;
    align-items: center;
    font-size: 17px;

    span {
      color: black;
      transition: all 0.1s ease-out;
    }

    &:after {
      margin-top: 0.1em;
      color: black;
      transition: all 0.1s ease-out;
    }

    &:hover {
      span,
      &:after {
        color: $admin-blue;
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
