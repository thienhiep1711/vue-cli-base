<template>
  <div class="todo__extra-text">
    <button
      v-if="showClearCompletedButton"
      @click="clearCompleted"
    >
      Clear Completed
    </button>
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
      this.$store.state.todos = this.$store.state.todos.filter(todo => !todo.completed)
    }
  }
}
</script>
