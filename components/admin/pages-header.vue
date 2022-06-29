<template>
  <header class="pages-header-container">
    <b-navbar toggleable="sm" fixed="top">
      <b-navbar-toggle target="header-collapse"></b-navbar-toggle>
      <b-collapse id="header-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <button>რედაქტირება</button>
          <button>გვერდების ატვირთვა</button>
          <button>ცვლილებების შენახვა</button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss">
.pages-header-container {
  nav {
    border-bottom: 1px solid black;
    background-color: white;

    .navbar-nav {
      button {
        margin: 5px 10px;
        border: none;
        background-color: transparent;
      }
    }
  }
}
</style>
