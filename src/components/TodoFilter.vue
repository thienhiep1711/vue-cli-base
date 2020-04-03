<template>
  <div class="todo__extra-buttons">
    <button
      :class="['todo__button', {'todo__button--active' : filter === 'all'}]"
      @click="changeFilter('all')"
    >
      All
    </button>
    <button
      :class="['todo__button', {'todo__button--active' : filter === 'active'}]"
      @click="changeFilter('active')"
    >
      Active
    </button>
    <button
      :class="['todo__button', {'todo__button--active' : filter === 'completed'}]"
      @click="changeFilter('completed')"
    >
      Completed
    </button>
  </div>
</template>

<script>
export default {
  name: 'todo-filter',
  computed: {
    filter () {
      return this.$store.getters.filter
    }
  },
  methods: {
    changeFilter (filter) {
      this.$store.state.filter = filter
    }
  }
}
</script>
