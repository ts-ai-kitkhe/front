<template>
  <header class="admin-header-container">
    <b-navbar toggleable="sm" fixed="top">
      <NuxtLink to="/#feed" class="navbar-brand">LOGO</NuxtLink>
      <b-navbar-toggle target="header-collapse"></b-navbar-toggle>
      <b-collapse id="header-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <button v-b-modal.upload-book-modal>წიგნის ატვირთვა</button>
          <b-modal
            id="upload-book-modal"
            centered
            title="წიგნის ატვირთვა"
            cancel-title="გაუქმება"
            ok-title="დადასტურება"
          >
            <form>
              <b-form-group label="სათაური" label-for="title-input">
                <b-form-input
                  id="title-input"
                  class="title-input"
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
                ></VueSelect>
              </b-form-group>
            </form>
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
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('admin', ['adminEmail']),
    ...mapGetters('admin', ['allAuthors']),
  },

  created() {
    this.getAllAuthors()
  },

  methods: {
    ...mapActions('admin', ['getAllAuthors']),
  },
}
</script>

<style lang="scss">
.admin-dropdown {
  .dropdown-toggle {
    display: flex;
    align-items: center;

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
        color: #007bff;
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
