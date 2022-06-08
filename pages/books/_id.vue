<template>
  <div class="container">
    {{ bookById }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'catalogue',

  data() {
    return {
      bookId: this.$route.params.id,
    }
  },

  computed: mapGetters('books', ['bookById']),

  created() {
    this.getBookById(this.bookId)
  },

  methods: {
    ...mapActions('books', ['getBookById']),
  },
}
</script>

<style lang="scss" scoped></style>
