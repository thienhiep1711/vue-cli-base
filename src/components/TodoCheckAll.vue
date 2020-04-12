<template>
  <div class="todo__extra">
    <div class="todo__extra-all">
      <label for="checkAll" class="todo__item-checkbox">
        <input
          type="checkbox"
          name="checkAll"
          id="checkAll"
          :checked="remaining === 0"
          @change="checkAllTodos"
        />
        <label for="checkAll"></label>
        <span class="todo__item-checkbox-text">All</span>
      </label>
    </div>
    <div class="todo__extra-text">
      <span v-if="remaining">{{ remaining }} items left</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo-check-all',
  computed: {
    remaining () {
      return this.$store.getters.remaining
    }
  },
  methods: {
    checkAllTodos () {
      this.$store.dispatch('checkAll', event.target.checked)
    }
  }
}
</script>

<style lang="scss">
.todo__extra-all {
  .todo__item-checkbox {
    display: flex;
    align-items: center;
  }

  span {
    padding-left: 10px;
  }
}

.todo__item-checkbox-text {
  font-weight: 500;
  font-size: 13px;
}
</style>
