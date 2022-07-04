<template>
  <div class="operator-container">
    <div ref="upperPanel" class="upper-panel">
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
    <div ref="imgWrapper" class="img-wrapper">
      <img
        id="main-img"
        ref="mainImg"
        src="~/assets/images/test1.jpg"
        alt="Scanned Page"
        :style="[addRectMode ? { cursor: 'cell' } : {}]"
        @load="fetchData"
        @click="checkAndAddRect"
      />
      <div class="canvas">
        <div v-for="(rect, index) in rectCoords" :key="index">
          <VueDraggableResizable
            class-name-active="rect-active"
            :w="rect.w"
            :h="rect.h"
            :x="rect.x"
            :y="rect.y"
            :z="99"
            :active="rect.active"
            @activated="handleRectActivation(rect)"
            @deactivated="handleRectDeactivation(rect)"
          >
            <input
              class="letter"
              :value="rect.letter"
              maxlength="1"
              @keydown="changeLetter($event, rect)"
              @keyup.backspace="deleteRect"
            />
          </VueDraggableResizable>
        </div>
      </div>
    </div>
    <div class="bottom-panel">
      <button v-show="!addRectMode" @click="addRectMode = true">
        მართკუთხედის დამატება
      </button>
      <button v-show="addRectMode" @click="addRectMode = false">
        გაუქმება
      </button>
      <button>რედაქტირების დასრულება</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rectCoords: [],
      currPage: 1,
      numPages: 13,
      topY: 0,
      selectedRect: null,
      addRectMode: false,
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
  },

  mounted() {
    this.$refs.imgWrapper.addEventListener('scroll', this.updateCooordinates)
  },

  destroyed() {
    this.$refs.imgWrapper?.removeEventListener(
      'scroll',
      this.updateCooordinates
    )
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
            active: false,
            letter: 'ჯ',
          }))
        })
    },

    checkAndAddRect(event) {
      if (this.addRectMode) {
        const initRectDim = 40
        const topOffset = this.$refs.upperPanel.clientHeight - this.topY

        this.rectCoords.push({
          id: Math.random() * 999999,
          x: event.clientX - initRectDim / 2,
          y: event.clientY - topOffset - initRectDim / 2,
          h: initRectDim,
          w: initRectDim,
          active: false,
          letter: '',
        })

        this.addRectMode = false
      }
    },

    updateCooordinates(e) {
      this.topY = e.target.scrollTop
    },

    handleRectActivation(rect) {
      this.selectedRect = rect
      this.selectedRect.active = true
    },

    handleRectDeactivation(rect) {
      if (this.selectedRect?.id === rect.id) {
        this.selectedRect = null
      }
    },

    changeLetter(event, rect) {
      if (event.key.length === 1) {
        event.target.value = event.key
        rect.letter = event.key
      }

      if (event.key === 'Backspace') {
        event.preventDefault()
      }
    },

    deleteRect() {
      if (this.selectedRect) {
        this.rectCoords = this.rectCoords.filter((rect) => {
          rect.active = false
          if (rect.id === this.selectedRect?.id) {
            this.handleRectDeactivation(rect)
            return false
          }
          return true
        })
      }
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/scss/vdr.scss';

.operator-container {
  .upper-panel {
    height: 8vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

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
    height: 77vh;
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

    .letter-input {
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
