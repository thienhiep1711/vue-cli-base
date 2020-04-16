<template>
  <div class="todo__extra">
    <div class="todo__extra-all">
      <label
        for="checkAll"
        class="todo__item-checkbox"
      >
        <input
          id="checkAll"
          type="checkbox"
          name="checkAll"
          :checked="remaining === 0"
          @change="checkAllTodos"
        >
        <label for="checkAll" />
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
