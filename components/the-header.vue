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
  border-bottom: 1px solid black;

  .navbar-nav {
    a {
      margin: 10px;
    }
  }
}
</style>
