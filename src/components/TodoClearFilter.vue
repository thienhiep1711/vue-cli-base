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
  props: {
    showClearCompletedButton: {
      type: Boolean,
      required: true
    },
    clearCompleted: {
      type: Function,
      required: true
    }
  }
}
</script>
