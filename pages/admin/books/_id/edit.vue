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
      />
      <div class="canvas"></div>
    </div>
    <div class="bottom-panel">
      <div class="letter-input">
        <input type="text" />
        <button>დადასტურება</button>
      </div>
      <button>მართკუთხედის დამატება</button>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Operator',
    }
  },
}
</script>

<style lang="scss" scoped>
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
