<template>
  <header class="header-container">
    <b-navbar toggleable="sm">
      <NuxtLink to="/#feed" class="navbar-brand">LOGO</NuxtLink>
      <b-navbar-toggle target="header-collapse"></b-navbar-toggle>
      <b-collapse id="header-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <NuxtLink to="/books" class="header-btn">წიგნები</NuxtLink>
          <NuxtLink to="/contact" class="header-btn">კონტაქტი</NuxtLink>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss">
.header-container {
  background-color: transparent;

  .navbar-brand {
    color: $txt-color-main;
  }

  .navbar-nav {
    a {
      color: $txt-color-main;
      margin: 10px 15px;
      text-decoration: none;
      transition: all 0.1s ease-out;
      font-size: 18px;

      &:hover {
        color: $txt-color-main-hover;
      }
    }
  }
}
</style>
