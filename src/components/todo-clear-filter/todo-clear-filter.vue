<template>
  <div class="todo__extra-text">
    <button
      v-if="showClearCompletedButton"
      @click="clearCompleted"
      class="todo__button"
    >Clear Completed</button>
  </div>
</template>

<script>
export default {
  name: 'todo-clear-filter',
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
