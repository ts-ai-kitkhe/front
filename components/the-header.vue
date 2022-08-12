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
  font-family: $geo-font-primary;
  letter-spacing: 0.5px;
  font-size: 22px;

  .navbar-brand {
    color: $txt-color-main;
  }

  .navbar-toggler {
    padding: 8px;
  }

  .navbar-toggler[aria-expanded='true'] {
    .navbar-toggler-icon {
      transform: rotate(90deg);
    }
  }

  .navbar-toggler-icon {
    transition: 0.2s linear;
    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><path stroke='rgba(255, 255, 255, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/></svg>") !important;
  }

  .navbar-nav {
    a {
      color: $txt-color-main;
      margin: 10px 15px;
      text-decoration: none;
      transition: all 0.1s ease-out;

      &:hover {
        color: $txt-color-main-hover;
      }

      @include xs {
        color: $txt-color-main-hover;
      }
    }

    @include xs {
      margin: 5px 0;
    }
  }
}
</style>
