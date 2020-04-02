<template>
  <div class="todo__extra">
    <div class="todo__extra-all">
      <label for="checkAll">
        <input
          type="checkbox"
          name="checkAll"
          :checked="remaining === 0"
          @change="checkAllTodos"
        >
        Check All
      </label>
    </div>
    <div class="todo__extra-text">
      {{ remaining }} items left
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo-check-all',
  props: {
    checkAllTodos: {
      type: Function,
      required: true
    }
  },
  computed: {
    remaining () {
      return this.$store.getters.remaining
    }
  }
}
</script>
