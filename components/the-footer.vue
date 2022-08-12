<template>
  <footer>
    <span class="copyright">Copyright © 2022</span>
    <span class="company">ts-ai-kitkhe</span>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: $footer-height;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $bg-color-main;
  color: $txt-color-main;
  font-family: $geo-font-primary;
  font-size: 20px;
  letter-spacing: 1px;

  .company {
    margin-left: 5px;
    color: white;
  }
}
</style>
