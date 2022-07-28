<template>
  <div class="col-lg-3 col-md-4 col-sm-6">
    <div class="admin-book-card-container mx-4 my-2">
      <div class="card px-4 px-sm-0">
        <div class="img-wrapper">
          <img :src="adminBook.image" alt="Book Card Image" />
          <div class="pencil-icon">
            <b-btn v-b-modal="modalId() + '-r'">
              <b-icon icon="pencil-square"></b-icon>
            </b-btn>
            <b-modal :id="modalId() + '-r'" centered title="Edit">
              <b-form action="" method="">
                <b-form-group label="სათაური" label-for="title">
                  <b-form-input id="title" :value="adminBook.title" />
                </b-form-group>
                <b-form-group label="ავტორი" label-for="author">
                  <b-form-input id="author" :value="adminBook.author" />
                </b-form-group>
                <div class="visibility-switch d-flex">
                  <span class="mr-2">Private</span>
                  <b-form-checkbox switch></b-form-checkbox>
                  <span class="mr-2">Public</span>
                </div>
              </b-form>
            </b-modal>
          </div>
          <div class="trash-icon">
            <b-btn v-b-modal="modalId() + '-l'">
              <b-icon icon="trash"></b-icon>
            </b-btn>
            <b-modal :id="modalId() + '-l'" centered title="Are you sure?">
              <p>Some text</p>
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
export default {
  props: {
    adminBook: {
      type: Object,
      default: null,
    },
  },

  methods: {
    modalId() {
      return 'modal-' + this.adminBook.id
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

      $svg-dimension: 20px;
      $btn-padding: 3px;

      .pencil-icon,
      .trash-icon {
        position: absolute;
        right: 0;
        background-color: white;
        padding: $btn-padding;
        border: 1px solid black;
        visibility: hidden;
        opacity: 0;
        transition: 0.1s ease-out;

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
        top: $svg-dimension + 2 * $btn-padding + 9px;
      }

      &:hover {
        img {
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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
        transition: 0.1s ease-out;

        h5 {
          font-size: 18px;
        }

        h6 {
          font-size: 16px;
          font-weight: 200;
        }

        &:hover {
          color: #0000ee;
        }
      }
    }
  }
}
</style>
