<template>
  <div class="books-container content-wrap">
    <div class="container my-3">
      <div class="row books-cover-row">
        <div class="books-cover-wrapper">
          <img
            src="~/assets/images/cover_bg.webp"
            alt="Books Feed Cover"
            class="books-cover"
          />
          <div class="books-cover-txt">#იკითხექართულად</div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 px-lg-4">
          <div class="sidebar-container pb-4">
            <b-navbar toggleable="lg p-0">
              <b-navbar-toggle target="nav-collapse">
                <template #default>ფილტრები</template>
              </b-navbar-toggle>
              <b-collapse id="nav-collapse" is-nav>
                <div class="sidebar-radio mt-1 mb-5">
                  <b-form-group>
                    <label class="filter-label sort-label mb-3"
                      >სორტირება</label
                    >
                    <b-form-radio v-model="filterBy" value="new"
                      >ბოლოს დამატებული</b-form-radio
                    >
                    <b-form-radio v-model="filterBy" value="titleabc"
                      >სათაური (ანბანის მიხედვით)</b-form-radio
                    >
                    <b-form-radio v-model="filterBy" value="authorabc"
                      >ავტორი (ანბანის მიხედვით)</b-form-radio
                    >
                    <b-form-radio v-model="filterBy" value="conf1"
                      >დამაჯერებლობა (ზრდადობით)</b-form-radio
                    >
                    <b-form-radio v-model="filterBy" value="conf2"
                      >დამაჯერებლობა (კლებადობით)</b-form-radio
                    >
                    <b-form-radio v-model="filterBy" value="year1"
                      >გამოცემის თარიღი (ძველიდან ახლისკენ)</b-form-radio
                    >
                    <b-form-radio v-model="filterBy" value="year2"
                      >გამოცემის თარიღი (ახლიდან ძველისკენ)</b-form-radio
                    >
                  </b-form-group>
                </div>
                <div class="sidebar-range">
                  <label for="mr-slider" class="filter-label slider-label">
                    <div>დამაჯერებლობის</div>
                    <div>ინტერვალი</div>
                  </label>
                  <VueSlider
                    id="mr-slider"
                    v-model="value"
                    :tooltip-formatter="'{value}%'"
                  />
                </div>
              </b-collapse>
            </b-navbar>
          </div>
        </div>
        <div class="col-lg-9 px-lg-5">
          <div class="search-bar-container">
            <b-input-group class="mb-3">
              <b-form-input
                v-model="search"
                type="search"
                placeholder="მოძებნე..."
              ></b-form-input>
            </b-input-group>
          </div>
          <div class="books-row">
            <div class="row">
              <BookCard
                v-for="book in matchingBooks"
                :key="book.Id"
                :book-info="book"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import 'vue-slider-component/theme/antd.css'

export default {
  layout: 'catalogue',

  data() {
    return {
      search: '',
      filterBy: 'new',
      value: [13, 65],
    }
  },

  computed: {
    ...mapGetters('books', ['allBooks']),

    matchingBooks: function () {
      const matchingBooks = this.allBooks.filter((book) => {
        return (
          book.title.toLowerCase().includes(this.search.toLowerCase()) ||
          book.authorName.toLowerCase().includes(this.search.toLowerCase()) ||
          book.year.toString().includes(this.search)
        )
      })

      const fnMap = {
        new: () => this.sortBy(matchingBooks, 'createdAt', true),
        titleabc: () => this.sortBy(matchingBooks, 'title'),
        authorabc: () => this.sortBy(matchingBooks, 'authorName'),
        conf1: () => null, // TODO
        conf2: () => null, // TODO
        year1: () => this.sortBy(matchingBooks, 'year'),
        year2: () => this.sortBy(matchingBooks, 'year', true),
      }

      fnMap[this.filterBy]()
      return matchingBooks
    },
  },

  created() {
    this.getBooks()
  },

  methods: {
    ...mapActions('books', ['getBooks']),

    sortBy(arr, field, reverse = false) {
      arr.sort((a, b) =>
        a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0
      )
      if (reverse) {
        arr.reverse()
      }
    },
  },
}
</script>

<style lang="scss">
.sidebar-container {
  .navbar {
    justify-content: center;
    font-family: $geo-font-primary;
    font-size: 18px;

    .custom-control-input:checked ~ .custom-control-label::before {
      border-color: #7c66d8 !important;
      background-color: #7c66d8 !important;
    }

    .custom-control-input:focus ~ .custom-control-label::before {
      box-shadow: 0 0 0 0.2rem rgb(124 102 216 / 35%);
    }

    .custom-control-input:not(:disabled):active
      ~ .custom-control-label::before {
      background-color: #7c66d8;
      border-color: #7c66d8;
    }

    .navbar-toggler {
      color: white;
      border: 2px solid white;
      padding: 10px 15px;
      border-radius: 20px;
      width: 100%;
      transition: 0.1s ease-out;

      @media screen and (max-width: 400px) {
        width: 80%;
      }

      &:hover {
        color: black;
        background-color: white;
      }
    }

    .navbar-collapse {
      flex-direction: column;
      align-items: flex-start;

      @include md {
        margin-top: 1rem;
        padding: 1rem;
      }

      .filter-label {
        font-size: 24px;
        font-family: $geo-font-primary-bold;
      }

      .sidebar-radio {
        width: 100%;

        .form-group {
          text-align: center !important;

          .custom-radio {
            text-align: left !important;
            margin: 10px 0;
          }
        }

        .sort-label {
          text-align: center;
        }
      }

      .sidebar-range {
        width: 100%;

        .slider-label {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .vue-slider {
          margin-top: 30px;

          .vue-slider-process {
            background-color: #7c66d8;
          }

          .vue-slider-dot-handle {
            border: 2px solid #beb3ec;
          }

          .vue-slider-dot-handle-focus {
            border-color: beb3ec;
            box-shadow: 0 0 0 5px rgb(124 102 216 / 35%);
          }
        }
      }
    }
  }
}

.books-container {
  .books-cover-row {
    margin-bottom: 3rem;

    @include md {
      margin-bottom: 2rem;
    }

    .books-cover-wrapper {
      position: relative;
      width: 100%;
      height: 300px;

      .books-cover {
        width: 100%;
        object-fit: cover;
        height: 100%;
      }

      .books-cover-txt {
        position: absolute;
        font-family: 'BPG Boxo-Boxo', sans-serif;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 5vw;
        letter-spacing: 2px;
        cursor: default;

        @media screen and (max-width: 1400px) {
          font-size: 6.5vw;
        }

        @include xs {
          font-size: 8vw;
        }
      }

      @include sm {
        height: 200px;
      }
    }
  }

  .search-bar-container {
    input {
      border-width: 2px;
      border-radius: 40px;
      padding: 20px;
      border: 2px solid #37393d;
      background-color: #2f2f2f;
      color: white;
      font-family: $geo-font-primary;
      font-size: 20px;

      &::placeholder {
        color: #929397;
        opacity: 1;
      }

      &:focus {
        border-color: #929397;
        box-shadow: none;
      }
    }

    @media screen and (max-width: 400px) {
      width: 80%;
      margin: 0 auto;
    }
  }

  .books-row {
    .row {
      align-items: flex-start;

      @include xs {
        justify-content: center;
      }
    }
  }
}
</style>
