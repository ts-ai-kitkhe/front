<template>
  <div>
    <div v-if="loadingMode" class="loading-mode">
      <AdminBookSpinner />
    </div>
    <div v-else class="operator-container">
      <div ref="upperPanel" class="upper-panel">
        <button class="go-back-btn" @click="goBackToBook">
          <b-icon icon="arrow-left" class="arrow-icon"></b-icon>
          <span>უკან დაბრუნება</span>
        </button>
        <div class="nav-panel">
          <div
            class="arrow-container right"
            :class="{ 'is-hidden': parseInt(currPage) === 1 }"
            @click="navigateToPrevPage"
          >
            <i class="arrow arrow-right"></i>
          </div>
          <input
            type="text"
            class="current-page"
            :value="currPage"
            @keyup.enter="navigateToEnteredPage($event)"
          />
          <div class="slash">/</div>
          <div class="pages-total">{{ numPages }}</div>
          <div
            class="arrow-container left"
            :class="{ 'is-hidden': parseInt(currPage) === numPages }"
            @click="navigateToNextPage"
          >
            <i class="arrow arrow-left"></i>
          </div>
        </div>
        <div></div>
      </div>
      <div ref="imgWrapper" class="img-wrapper">
        <img
          id="main-img"
          ref="mainImg"
          :src="
            'https://assets.ts-ai-kitkhe.ge/books/' +
            bookId +
            '/pages/' +
            filename +
            '.' +
            extension
          "
          alt="Scanned
        Page"
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
              :style="[
                rect.confidence < 0.5 ? { outline: '2px solid #ea4235' } : {},
                rect.confidence >= 0.5 ? { outline: '2px solid #fabc05' } : {},
                rect.confidence > 0.75 ? { outline: '2px solid #32a953' } : {},
              ]"
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
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  layout: 'operator',

  data() {
    return {
      loadingMode: false,
      rectCoords: [],
      currPage: this.$route.params.page, // TODO: Refactor
      bookId: this.$route.params.id,
      filename: this.$route.params.page,
      extension: this.$route.query.ext,
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
    this.$refs.imgWrapper?.addEventListener('scroll', this.updateCooordinates)
  },

  destroyed() {
    this.$refs.imgWrapper?.removeEventListener(
      'scroll',
      this.updateCooordinates
    )
  },

  methods: {
    async fetchData() {
      const predictionsURL = `https://ml.ts-ai-kitkhe.ge/books/${this.bookId}/pages/${this.filename}.json`
      return await fetch(predictionsURL)
        .then((response) => response.json())
        .then((data) => {
          const imgShape = { h: data.shape.height, w: data.shape.width }
          const screenSize = { h: this.imageHeight, w: this.imageWidth }

          const rescaleH = (x) => (x / imgShape.h) * screenSize.h
          const rescaleW = (x) => (x / imgShape.w) * screenSize.w

          this.rectCoords = data.data.map((rect) => ({
            id: rect.id,
            x: rescaleW(rect.corners[0][0]),
            y: rescaleH(rect.corners[0][1]),
            h: rescaleH(rect.corners[2][1] - rect.corners[0][1]),
            w: rescaleW(rect.corners[2][0] - rect.corners[0][0]),
            active: false,
            confidence: parseFloat(rect.confidence),
            letter: rect.letter,
          }))
        })
        .catch((_) => (this.loadingMode = true))
    },

    checkAndAddRect(event) {
      if (this.addRectMode) {
        const initRectDim = 30
        const topOffset = this.$refs.upperPanel.clientHeight - this.topY

        this.rectCoords.push({
          id: uuidv4(),
          x: event.clientX - initRectDim / 2,
          y: event.clientY - topOffset - initRectDim / 2,
          h: initRectDim,
          w: initRectDim,
          active: false,
          confidence: 1,
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

    navigateToPrevPage() {
      if (this.currPage > 1) {
        this.currPage--
        const currPath = this.$route.path
        const newPath =
          currPath.substr(0, currPath.lastIndexOf('/')) +
          '/' +
          String(this.currPage)
        this.$router.push({ path: newPath })
      }
    },

    navigateToNextPage() {
      if (this.currPage < this.numPages) {
        this.currPage++
        const currPath = this.$route.path
        const newPath =
          currPath.substr(0, currPath.lastIndexOf('/')) +
          '/' +
          String(this.currPage)
        this.$router.push({ path: newPath })
      }
    },

    navigateToEnteredPage(event) {
      const pageInput = event.target.value
      if (
        Number.isInteger(Number(pageInput)) &&
        pageInput > 0 &&
        pageInput <= this.numPages
      ) {
        const currPath = this.$route.path
        const newPath =
          currPath.substr(0, currPath.lastIndexOf('/')) +
          '/' +
          String(pageInput)
        this.$router.push({ path: newPath })
      } else {
        event.target.value = this.currPage
      }
    },

    goBackToBook() {
      const currPath = this.$route.path
      const newPath = currPath.substr(0, currPath.lastIndexOf('/'))
      this.$router.push({ path: newPath })
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/scss/vdr.scss';

.loading-mode {
  width: 100%;
  height: 100vh;
}

.operator-container {
  $upper-panel-h: 5vh;
  $img-wrapper-h: 83vh;

  .upper-panel {
    height: $upper-panel-h;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;

    $go-back-btn-width: 165px;
    $go-back-btn-ml: 30px;

    .go-back-btn {
      width: $go-back-btn-width;
      margin-left: $go-back-btn-ml;
      background-color: transparent;
      border: none;
      transition: 0.1s ease-in;
      display: flex;
      align-items: center;
      gap: 8px;

      &:hover {
        color: $blue-color;
      }
    }

    .nav-panel {
      margin: 10px 0;
      line-height: 30px;
      font-size: 18px;
      display: flex;
      align-items: center;
      margin-left: -1 * ($go-back-btn-width + $go-back-btn-ml);

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
    border-top: 2px solid rgb(230, 230, 230);
    border-bottom: 2px solid rgb(230, 230, 230);
    overflow: scroll;
    position: relative;
    height: $img-wrapper-h;
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
    height: 100vh - ($upper-panel-h + $img-wrapper-h);
    justify-content: center;
    gap: 10px;

    button {
      padding: 5px 10px;
      font-size: 16px;
      border-radius: 20px;
      transition: all 0.1s ease-out;

      &:nth-child(1),
      &:nth-child(2) {
        background-color: white;
        color: black;
        border: 2px solid rgba(0, 0, 0, 0.3);

        &:hover {
          $dark-gray: rgba(0, 0, 0, 0.75);
          background-color: $dark-gray;
          border: 2px solid $dark-gray;
          color: white;
        }
      }

      &:nth-child(3) {
        $dark-green: #66b032;
        $light-green: #84bf5a;

        background-color: $dark-green;
        border: 2px solid $dark-green;
        color: white;

        &:hover {
          background-color: $light-green;
          border: 2px solid $light-green;
        }
      }
    }
  }
}
</style>
