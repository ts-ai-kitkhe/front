<template>
  <div id="app">
    <VueDropzone></VueDropzone>
  </div>
</template>

<script>
import VueDropzone from '../components/dropzone.vue'

export default {
  name: 'App',
  components: {
    VueDropzone,
  },
}
</script>

<style>
body {
  font-family: 'Open Sans', sans-serif;
}
</style>
