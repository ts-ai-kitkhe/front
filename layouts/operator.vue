<template>
  <div>
    <AdminSmallScreen v-show="windowWidth < minWidth"></AdminSmallScreen>
    <Nuxt />
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  data() {
    return {
      minWidth: 992,
      windowWidth: window.innerWidth,
    }
  },

  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
}
</script>
