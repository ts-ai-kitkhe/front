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
            @click="navigateToPrevPage(adminBookPages)"
          >
            <i class="arrow arrow-right"></i>
          </div>
          <input
            type="text"
            class="current-page"
            :value="calculateCurrPage(adminBookPages)"
            @keyup.enter="navigateToEnteredPage($event, adminBookPages)"
          />
          <div class="slash">/</div>
          <div class="pages-total">{{ calculateNumPages(adminBookPages) }}</div>
          <div
            class="arrow-container left"
            :class="{ 'is-hidden': parseInt(currPage) === numPages }"
            @click="navigateToNextPage(adminBookPages)"
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
                { 'font-size': Math.min(rect.w, rect.h) + 'px' },
              ]"
              @activated="handleRectActivation(rect)"
              @deactivated="handleRectDeactivation(rect)"
              @resizestop="handleResizeStop(rect, ...arguments)"
              @dragstop="handleDragStop(rect, ...arguments)"
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
        <button @click="finishEditing">რედაქტირების დასრულება</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'operator',

  data() {
    return {
      loadingMode: false,
      rectCoords: [],
      currPage: 0,
      bookId: this.$route.params.id,
      filename: this.$route.params.page,
      extension: this.$route.query.ext,
      numPages: 0,
      topY: 0,
      selectedRect: null,
      addRectMode: false,
      newRects: new Set(),
      modifiedRects: new Set(),
      deletedRects: new Set(),
    }
  },

  head() {
    return {
      title: 'Admin',
    }
  },

  computed: {
    ...mapGetters('admin', ['adminBookPages']),

    imageHeight() {
      return this.$refs.mainImg.clientHeight
    },

    imageWidth() {
      return this.$refs.mainImg.clientWidth
    },
  },

  created() {
    this.getAdminBookPages(this.bookId)
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
      const predictionsURL = `https://ml.ts-ai-kitkhe.ge/books/${
        this.bookId
      }/pages/predictions/${this.filename}.json?${Date.now()}`
      return await axios
        .get(predictionsURL)
        .then((response) => response.data)
        .then((data) => {
          const startHeight = data.shape.height
          const startWidth = data.shape.width

          this.startHeight = startHeight
          this.startWidth = startWidth

          this.rectCoords = data.data.map((rect) => ({
            id: rect.id,
            x: this.rescaleCoords(
              rect.corners[0][0],
              this.startWidth,
              this.imageWidth
            ),
            y: this.rescaleCoords(
              rect.corners[0][1],
              this.startHeight,
              this.imageHeight
            ),
            h: this.rescaleCoords(
              rect.corners[2][1] - rect.corners[0][1],
              this.startHeight,
              this.imageHeight
            ),
            w: this.rescaleCoords(
              rect.corners[2][0] - rect.corners[0][0],
              this.startWidth,
              this.imageWidth
            ),
            active: false,
            confidence: parseFloat(rect.confidence),
            letter: rect.letter,
          }))
        })
        .catch((_) => (this.loadingMode = true))
    },

    ...mapActions('admin', ['getAdminBookPages']),

    rescaleCoords(coord, initial, final) {
      return (coord / initial) * final
    },

    checkAndAddRect(event) {
      if (this.addRectMode) {
        const initRectDim = 30
        const topOffset = this.$refs.upperPanel.clientHeight - this.topY
        const newRectId = uuidv4()

        this.rectCoords.push({
          id: newRectId,
          x: event.clientX - initRectDim / 2,
          y: event.clientY - topOffset - initRectDim / 2,
          h: initRectDim,
          w: initRectDim,
          active: false,
          confidence: 1,
          letter: '',
        })

        this.newRects.add(newRectId)
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

    handleResizeStop(rect, x, y, width, height) {
      this.modifiedRects.add(rect.id)
      this.rectCoords = this.rectCoords.map((curr) => {
        if (curr.id === rect.id) {
          return { ...curr, x, y, w: width, h: height, confidence: 1 }
        }
        return curr
      })
    },

    handleDragStop(rect, x, y) {
      this.modifiedRects.add(rect.id)
      this.rectCoords = this.rectCoords.map((curr) => {
        if (curr.id === rect.id) {
          return { ...curr, x, y, confidence: 1 }
        }
        return curr
      })
    },

    changeLetter(event, rect) {
      if (event.key.length === 1) {
        event.target.value = event.key
        rect.letter = event.key
        rect.confidence = 1
        this.modifiedRects.add(rect.id)
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
            this.deletedRects.add(rect.id)
            this.handleRectDeactivation(rect)
            return false
          }
          return true
        })
      }
    },

    calculateCurrPage(pages) {
      const index = pages.findIndex(
        (page) => page.id === this.filename + '.' + this.extension
      )

      if (index !== -1) {
        this.currPage = index + 1
      }

      return this.currPage
    },

    calculateNumPages(pages) {
      this.numPages = pages.length
      return this.numPages
    },

    navigateToPrevPage(pages) {
      if (this.currPage > 1) {
        this.generatePathForNav(pages[this.currPage - 2].id)
      }
    },

    navigateToNextPage(pages) {
      if (this.currPage < this.numPages) {
        this.generatePathForNav(pages[this.currPage].id)
      }
    },

    navigateToEnteredPage(event, pages) {
      const pageInput = event.target.value
      if (
        Number.isInteger(Number(pageInput)) &&
        pageInput > 0 &&
        pageInput <= this.numPages
      ) {
        this.generatePathForNav(pages[pageInput - 1].id)
      } else {
        event.target.value = this.currPage
      }
    },

    generatePathForNav(navPage) {
      const filename = navPage.slice(0, navPage.lastIndexOf('.'))
      const ext = navPage.split('.').pop()
      const currPath = this.$route.path
      const newPath =
        currPath.substr(0, currPath.lastIndexOf('/')) +
        '/' +
        filename +
        '?ext=' +
        ext
      this.$router.push({ path: newPath })
    },

    goBackToBook() {
      const currPath = this.$route.path
      const newPath = currPath.substr(0, currPath.lastIndexOf('/'))
      this.$router.push({ path: newPath })
    },

    async finishEditing() {
      const newRectsCurr = new Set(
        [...this.newRects].filter((x) => !this.deletedRects.has(x))
      )

      const modifiedRectsCurr = new Set(
        [...this.modifiedRects].filter((x) => !this.deletedRects.has(x))
      )

      const findObjectById = (objId) =>
        this.rectCoords.find((rect) => rect.id === objId)

      const scaleBack = (obj) => {
        return {
          ...obj,
          x: this.rescaleCoords(obj.x, this.imageWidth, this.startWidth),
          y: this.rescaleCoords(obj.y, this.imageHeight, this.startHeight),
          h: this.rescaleCoords(obj.h, this.imageHeight, this.startHeight),
          w: this.rescaleCoords(obj.w, this.imageWidth, this.startWidth),
        }
      }

      const updatedRects = {
        added: Array.from(newRectsCurr).map(findObjectById).map(scaleBack),
        modified: Array.from(modifiedRectsCurr)
          .map(findObjectById)
          .map(scaleBack),
        deleted: Array.from(this.deletedRects),
      }

      await axios.patch(
        `https://api.ts-ai-kitkhe.ge/ml/books/${this.bookId}/pages/${this.filename}/predictions`,
        { updatedRects },
        {
          headers: {
            authorization:
              'Bearer ' +
              this.$auth.strategies.cognito.token.session.idToken.jwtToken,
          },
        }
      )

      window.location.reload(true)
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

      svg {
        margin-top: 2px;
      }

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
