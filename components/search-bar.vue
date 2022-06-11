<template>
  <div class="search-bar-container">
    <b-input-group class="mb-3">
      <b-form-input
        v-model="search"
        type="search"
        placeholder="მოძებნე..."
      ></b-form-input>
    </b-input-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
    }
  },
}
</script>

<style lang="scss">
.search-bar-container {
  input {
    border-radius: 20px;
  }
}
</style>
