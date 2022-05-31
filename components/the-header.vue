<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-light">
      <NuxtLink to="/feed" class="navbar-brand">LOGO</NuxtLink>
      <button class="navbar-toggler" type="button" data-toggle="collapse">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item">
            <NuxtLink to="/books" class="header-btn">წიგნები</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/about" class="header-btn">ჩვენ შესახებ</NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
header {
  .navbar {
    .nav-item {
      padding: 10px 15px;
    }
  }
}
</style>
