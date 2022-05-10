<template>
  <div class="operator-container">
    <div class="description">
      <h1 class="title">Book title goes here</h1>
      <h2 class="author">Author goes here</h2>
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
            @activated="onActivated"
            @deactivated="onDeactivated"
          >
            <div class="letter">
              <p>{{ rect.char }}</p>
            </div>
          </VueDraggableResizable>
        </div>
      </div>
    </div>
    <div class="bottom-panel">
      <div v-show="!addRectMode" class="letter-input">
        <input type="text" />
        <button>დადასტურება</button>
      </div>
      <button v-show="addRectMode">მართკუთხედის დამატება</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rectCoords: [],
      activatedCounter: 0,
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
          const imgShape = { h: 748, w: 570 }
          const screenSize = { h: this.imageHeight, w: this.imageWidth }

          const rescaleH = (x) => (x / imgShape.h) * screenSize.h
          const rescaleW = (x) => (x / imgShape.w) * screenSize.w

          this.rectCoords = Object.entries(data).map(([key, coords]) => ({
            id: key,
            x: rescaleW(coords[0][0]),
            y: rescaleH(coords[0][1]),
            h: rescaleH(coords[2][1] - coords[0][1]),
            w: rescaleW(coords[2][0] - coords[0][0]),
            char: 'ჯ',
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

<style lang="scss" scoped>
$handle-size: 7px;

.operator-container {
  .description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 15vh;

    .title {
      font-size: 2rem;
    }

    .author {
      font-size: 1rem;
    }
  }

  .img-wrapper {
    border: 1px solid black;
    overflow: scroll;
    position: relative;
    height: 65vh;

    img {
      width: 100%;
    }

    .canvas {
      position: absolute;
      top: 0;
      left: 0;

      .vdr {
        outline: 1px solid black;
        border: none;

        .handle {
          width: $handle-size;
          height: $handle-size;
          z-index: 111;
        }

        .handle-tl {
          top: -$handle-size;
          left: -$handle-size;
        }

        .handle-tm {
          top: -$handle-size;
          margin-left: calc($handle-size / -2);
        }

        .handle-tr {
          top: -$handle-size;
          right: -$handle-size;
        }

        .handle-ml {
          left: -$handle-size;
          margin-top: calc($handle-size / -2);
        }

        .handle-mr {
          right: -$handle-size;
          margin-top: calc($handle-size / -2);
        }

        .handle-bl {
          bottom: -$handle-size;
          left: -$handle-size;
        }

        .handle-bm {
          bottom: -$handle-size;
          margin-left: calc($handle-size / -2);
        }

        .handle-br {
          bottom: -$handle-size;
          right: -$handle-size;
        }

        .letter {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;

          p {
            color: transparent;
            cursor: default;
            margin: 0;
            text-align: center;
          }
        }

        &.rect-active {
          outline: 2px solid #a2cd48;
          box-shadow: 0px 0px 0px 999999px rgba(0, 0, 0, 0.8);
        }
      }
    }
  }

  .bottom-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    gap: 20px;

    .letter-input {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
  }
}
</style>
