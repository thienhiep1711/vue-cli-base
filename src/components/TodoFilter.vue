<template>
  <div class="todo__extra-buttons">
    <button
      :class="['todo__button', {'todo__button--active' : filter === 'all'}]"
      @click="filter = 'all'"
    >
      All
    </button>
    <button
      :class="['todo__button', {'todo__button--active' : filter === 'active'}]"
      @click="filter = 'active'"
    >
      Active
    </button>
    <button
      :class="['todo__button', {'todo__button--active' : filter === 'completed'}]"
      @click="filter = 'completed'"
    >
      Completed
    </button>
  </div>
</template>

<script>
export default {
  name: 'todo-filter'
}
</script>
