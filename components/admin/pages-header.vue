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
          <slot></slot>
          <NuxtLink
            v-show="showHeaderButtons"
            to="/admin/books"
            class="header-link"
            >ჩემი წიგნები</NuxtLink
          >
          <button v-show="showHeaderButtons" v-b-modal.upload-pages-modal>
            გვერდების ატვირთვა
          </button>
          <b-modal
            id="upload-pages-modal"
            class="my-modal"
            size="dropzone-md-lg"
            title="გვერდების ატვირთვა"
            :hide-footer="true"
            centered
            scrollable
          >
            <div class="dropzone-modal">
              <VueDropzone :book-id="bookId"></VueDropzone>
            </div>
          </b-modal>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import VueDropzone from '../dropzone.vue'

export default {
  components: {
    VueDropzone,
  },

  props: {
    showHeaderButtons: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      bookId: this.$route.params.id,
    }
  },
}
</script>

<style lang="scss">
.modal {
  .modal-dropzone-md-lg {
    max-width: 700px;
    width: 700px;
  }
}
</style>
