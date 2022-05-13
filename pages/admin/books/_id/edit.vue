<template>
  <div class="operator-container">
    <div class="upper-panel">
      <div class="description">
        <h1 class="title">Book title goes here</h1>
        <h2 class="author">Author goes here</h2>
      </div>
      <div class="nav-panel">
        <div
          class="arrow-container right"
          :class="{ 'is-hidden': currPage === 1 }"
        >
          <i class="arrow arrow-right"></i>
        </div>
        <input type="text" class="current-page" :value="currPage" />
        <div class="slash">/</div>
        <div class="pages-total">{{ numPages }}</div>
        <div
          class="arrow-container left"
          :class="{ 'is-hidden': currPage === numPages }"
        >
          <i class="arrow arrow-left"></i>
        </div>
      </div>
    </div>
    <div class="img-wrapper">
      <img
        id="main-img"
        ref="mainImg"
        src="~/assets/images/test.jpg"
        alt="Scanned Page"
        @load="fetchData"
      />
      <div class="canvas">
        <div v-for="(rect, index) in rectCoords" :key="index">
          <VueDraggableResizable
            class-name-active="rect-active"
            :w="rect.w"
            :h="rect.h"
            :x="rect.x"
            :y="rect.y"
          >
            <div class="word">{{ rect.word }}</div>
          </VueDraggableResizable>
        </div>
      </div>
    </div>
    <div class="bottom-panel">
      <div v-show="!addRectMode" class="word-input">
        <input type="text" />
        <button>დადასტურება</button>
      </div>
      <button v-show="addRectMode">მართკუთხედის დამატება</button>
      <button>რედაქტირების დასრულება</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rectCoords: [],
      activatedCounter: 0,
      currPage: 1,
      numPages: 13,
    }
  },

  head() {
    return {
      title: 'Operator',
    }
  },

  computed: {
    imageHeight() {
      return this.$refs.mainImg.clientHeight
    },

    imageWidth() {
      return this.$refs.mainImg.clientWidth
    },

    addRectMode() {
      return this.activatedCounter === 0
    },
  },

  methods: {
    async fetchData() {
      return await fetch('/coords.json')
        .then((response) => response.json())
        .then((data) => {
          const imgShape = { h: 2120, w: 1406 }
          const screenSize = { h: this.imageHeight, w: this.imageWidth }

          const rescaleH = (x) => (x / imgShape.h) * screenSize.h
          const rescaleW = (x) => (x / imgShape.w) * screenSize.w

          this.rectCoords = Object.entries(data).map(([key, coords]) => ({
            id: key,
            x: rescaleW(coords[0][0]),
            y: rescaleH(coords[0][1]),
            h: rescaleH(coords[2][1] - coords[0][1]),
            w: rescaleW(coords[2][0] - coords[0][0]),
            word: 'ჯ',
          }))
        })
    },

    onActivated() {
      this.activatedCounter++
    },

    onDeactivated() {
      this.activatedCounter--
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/scss/vdr.scss';

.operator-container {
  .upper-panel {
    height: 15vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    .description {
      .title {
        font-size: 2rem;
      }

      .author {
        font-size: 1rem;
      }
    }

    .nav-panel {
      margin: 10px 0;
      line-height: 30px;
      font-size: 18px;
      display: flex;
      align-items: center;

      .current-page {
        width: 55px;
        height: 24px;
        line-height: 24px;
        border: 1px solid black;
        text-align: center;
      }

      .slash {
        margin: 0 10px;
      }

      .arrow-container {
        height: 26px;
        width: 40px;
        margin: 0 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: black;
        border-radius: 20px;
        cursor: pointer;

        .arrow {
          border: solid white;
          border-width: 0 3px 3px 0;
          display: inline-block;
          padding: 4px;
          transition: 0.2s ease-in-out;
        }

        .arrow-left {
          transform: rotate(-45deg);
          margin-left: -3px;
        }

        .arrow-right {
          transform: rotate(135deg);
          margin-right: -3px;
        }

        &.right {
          &:hover {
            .arrow-right {
              margin-right: 2px;
            }
          }
        }

        &.left {
          &:hover {
            .arrow-left {
              margin-left: 2px;
            }
          }
        }
      }

      .is-hidden {
        cursor: not-allowed;
        background-color: darkgray;

        &.right {
          &:hover {
            .arrow-right {
              margin-right: -3px;
            }
          }
        }

        &.left {
          &:hover {
            .arrow-left {
              margin-left: -3px;
            }
          }
        }
      }
    }
  }

  .img-wrapper {
    border: 1px solid black;
    overflow: scroll;
    position: relative;
    height: 70vh;
    user-select: none;

    img {
      width: 100%;
    }

    .canvas {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .bottom-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    gap: 20px;

    .word-input {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;

      input {
        border: 1px solid black;
      }
    }
  }
}
</style>
