<template>
  <div class="col-md-4 col-sm-6">
    <div class="admin-book-card-container m-3">
      <div class="card px-4 px-sm-0">
        <div class="img-wrapper">
          <img :src="adminBook.image" alt="Book Card Image" />
          <div class="trash-icon">
            <b-btn v-b-modal="modalId() + '-top'">
              <b-icon icon="trash"> </b-icon>
            </b-btn>
            <b-modal :id="modalId() + '-top'" centered title="Are you sure?">
              <p>Some text</p>
            </b-modal>
          </div>
          <div class="card-buttons">
            <b-btn v-b-modal="modalId() + '-bottom'">Button 1</b-btn>
            <b-modal :id="modalId() + '-bottom'" centered title="Edit">
              <b-form action="" method="">
                <b-form-group label="სათაური" label-for="title">
                  <b-form-input id="title" :value="adminBook.title" />
                </b-form-group>
                <b-form-group label="ავტორი" label-for="author">
                  <b-form-input id="author" :value="adminBook.author" />
                </b-form-group>
                <div class="visibility-switch d-flex">
                  <span class="mr-2">Private</span>
                  <b-form-checkbox v-model="checked" switch></b-form-checkbox>
                  <span class="mr-2">Public</span>
                </div>
              </b-form>
            </b-modal>
            <button>Button 2</button>
          </div>
        </div>
        <div class="card-body">
          <h5>{{ adminBook.title }}</h5>
          <h6>{{ adminBook.author }}</h6>
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
        filter: brightness(100%);
        transition: 0.15s ease-out;
      }

      .trash-icon {
        position: absolute;
        top: 0;
        right: 0;
        visibility: hidden;
        background-color: white;
        border: 1px solid black;
        padding-top: 3px;
        opacity: 0;
        transition: 0.15s ease-out;

        button {
          background: none;
          border: none;

          .btn {
            padding: 0;
          }

          svg {
            width: 20px;
            height: 20px;
            color: black;
          }
        }
      }

      .card-buttons {
        position: absolute;
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        visibility: hidden;
        opacity: 0;
        transition: 0.15s ease-out;

        button {
          margin: 10px;
          border: none;
          background-color: white;
          color: black;
          border-radius: 5px;
          width: 40%;
          padding: 5px 10px;

          @include md {
            width: 70%;
            padding: 2px 5px;
          }
        }
      }

      &:hover {
        img {
          filter: brightness(50%) blur(1px);
        }

        .trash-icon {
          visibility: visible;
          opacity: 1;
        }

        .card-buttons {
          visibility: visible;
          opacity: 1;
        }
      }
    }

    .card-body {
      text-align: center;

      h5 {
        font-size: 18px;
      }

      h6 {
        font-size: 16px;
        font-weight: 200;
      }
    }
  }
}
</style>
