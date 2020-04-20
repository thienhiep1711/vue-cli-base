<template>
  <div class="todo__extra-text">
    <button
      v-if="showClearCompletedButton"
      class="todo__button"
      @click="clearCompleted"
    >
      Clear Completed
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    showClearCompletedButton () {
      return this.$store.getters.showClearCompletedButton
    }
  },
  methods: {
    clearCompleted () {
      this.$store.dispatch('clearCompleted')
    }
  }
}
</script>
