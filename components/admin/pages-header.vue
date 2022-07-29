<template>
  <header class="admin-header-container">
    <b-navbar toggleable="sm" fixed="top">
      <NuxtLink to="/#feed" class="navbar-brand">LOGO</NuxtLink>
      <b-navbar-toggle target="header-collapse"></b-navbar-toggle>
      <b-collapse id="header-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <NuxtLink to="/admin/books" class="header-link"
            >ჩემი წიგნები</NuxtLink
          >
          <button v-b-modal.upload-pages-modal>გვერდების ატვირთვა</button>
          <b-modal
            id="upload-pages-modal"
            class="my-modal"
            size="dropzone-md-lg"
            title="გვერდების ატვირთვა"
            centered
            scrollable
          >
            <div class="dropzone-modal">
              <VueDropzone></VueDropzone>
            </div>
          </b-modal>
          <button>ცვლილებების შენახვა</button>
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
}
</script>

<style lang="scss">
.dropzone-modal {
  .dropzone {
    padding: 20px;
    border: 2px dashed rgb(190, 190, 190);
    transition: all 0.1s ease;
    text-align: center;

    .dz-message {
      margin: 2em 0;

      svg {
        width: 70px;
        height: 70px;
      }

      .upload-txt {
        margin-top: 10px;
        font-size: 18px;

        span {
          &:nth-child(1) {
            font-weight: bold;
          }
        }
      }
    }
  }
}

.modal {
  .modal-dropzone-md-lg {
    max-width: 700px;
    width: 700px;
  }
}
</style>
