<template>
  <div class="todo">
    <input
      type="text"
      class="todo__input"
      placeholder="What needs to be done"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <div class="todo__list" v-if="todosFiltered.length > 0">
      <todo-item
        class="todo__item"
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :index="index"
        :checkAll="!anyRemaining"
        @finishedUpdateTodo="finishedUpdate"
      ></todo-item>
    </div>
    <todo-notice :isActive="true" v-else>
      <div class="todo-notice__text" v-if="currentFilter === 'active'">All Done!</div>
      <div class="todo-notice__text" v-if="currentFilter === 'completed'">Give up!</div>
      <div class="todo-notice__text" v-if="currentFilter === 'all'">Nothing todo...</div>
    </todo-notice>
    <todo-check-all v-if="allTodo > 0"></todo-check-all>
    <div class="todo__extra" v-if="allTodo > 0">
      <todo-filter></todo-filter>
      <todo-clear-filter></todo-clear-filter>
    </div>
  </div>
</template>

<script>

import TodoItem from './TodoItem'
import TodoFilter from './TodoFilter'
import TodoClearFilter from './TodoClearFilter'
import TodoCheckAll from './TodoCheckAll'
import TodoNotice from './TodoNotice'

export default {
  name: 'todo-list',
  components: {
    TodoItem,
    TodoFilter,
    TodoClearFilter,
    TodoCheckAll,
    TodoNotice
  },
  props: {
    msg: String
  },
  data () {
    return {
      newTodo: '',
      idForTodo: 4,
      beforeEditCache: ''
    }
  },
  computed: {
    remaining () {
      return this.$store.getters.remaining
    },
    anyRemaining () {
      return this.$store.getters.remaining !== 0
    },
    todosFiltered () {
      return this.$store.getters.todosFiltered
    },
    showClearCompletedButton () {
      return this.$store.getters.showClearCompletedButton
    },
    allTodo () {
      return this.$store.getters.allTodo
    },
    currentFilter () {
      return this.$store.getters.filter
    }
  },
  methods: {
    addTodo () {
      if (this.newTodo.trim() === '') {
        return
      }
      this.$store.dispatch('addTodo', {
        id: this.idForTodo,
        title: this.newTodo
      })
      this.newTodo = ''
      this.idForTodo++
    },
    finishedUpdate (data) {
      this.$store.state.todos.splice(data.index, 1, data.todo)
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

.todo__list {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}

.todo__extra {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  align-items: center;
  border-top: 1px solid #e5e5e5;
}

.todo__button {
  margin-right: 10px;
  padding: 5px 10px;
  border: 1px solid #41b882;
  background-color: #41b882;
  color: white;
  font-weight: bold;
  font-size: 13px;
  border-radius: 4px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:last-child {
    margin-right: 0;
  }
}

.todo__button--active {
  background-color: #35485d;
  border-color: #35485d;
}

.todo__input {
  width: 100%;
  height: 46px;
  margin: 0;
  padding: 8px 10px;
  border: 2px solid #e6e6e6;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #41b882;
  }
}

.todo__extra-text {
  font-weight: 500;
  font-size: 13px;
}
</style>
