<template>
  <div class="landing-wrapper">
    <h1>წაიკითხე</h1>
    <NuxtLink to="/books" class="landing-btn">მთავარი გვერდი</NuxtLink>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.landing-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;

  h1 {
    font-size: 15vw;
    margin-bottom: 10vh;

    @include md {
      font-size: 18vw;
    }
  }

  .landing-btn {
    position: absolute;
    top: 80%;
    color: black;
    background-color: white;
    padding: 10px 20px;
    border: 2px solid black;
    border-radius: 30px;
    font-size: 1.5rem;

    @include sm {
      padding: 6px 12px;
      font-size: 1.1rem;
    }

    &:hover {
      text-decoration: none;
    }
  }
}
</style>
