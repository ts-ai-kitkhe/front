<template>
  <div class="small-screen-container">
    <div class="small-screen-wrapper">
      <b-icon class="display-icon" icon="display"></b-icon>
      <p class="small-screen-txt">
        საიტის ფუნქციონალით სარგებლობისათვის გამოიყენეთ Desktop მოწყობილობა
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.small-screen-container {
  position: fixed;
  background-color: #f7f8fb;
  z-index: 1111;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  .small-screen-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
    width: min(500px, 70%);
    margin: 0 auto;
    text-align: center;

    .display-icon {
      height: 60px;
      width: 60px;
    }

    .small-screen-txt {
      font-family: 'BPG Nino Mkhedruli';
      font-size: 26px;
      margin-top: 20px;
      line-height: 36px;
    }
  }
}
</style>
