<template>
  <div class="todo">
    <input type="text"
      class="todo__input"
      placeholder="What needs to be done"
      v-model="newTodo"
      @keyup.enter="addTodo"
    >
    <div class="todo__list">
      <todo-item
        class="todo__item"
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :index="index"
        :checkAll="!anyRemaining"
        @finishedUpdateTodo="finishedUpdate"
      >
      </todo-item>
    </div>
    <todo-check-all></todo-check-all>
    <div class="todo__extra">
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

export default {
  name: 'todo-list',
  components: {
    TodoItem,
    TodoFilter,
    TodoClearFilter,
    TodoCheckAll
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
      console.log('add todo')
    },
    finishedUpdate (data) {
      this.$store.state.todos.splice(data.index, 1, data.todo)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  border-top: 1px solid #e5e5e5;
  padding: 15px 0;
  align-items: center;
}

.todo__button {
  margin-right: 10px;
  padding: 5px 10px;
  border: 1px solid skyblue;
  background-color: skyblue;
  color: white;
  font-weight: bold;
  font-size: 13px;
  border-radius: 4px;
}

.todo__input {
  height: 46px;
  border: 2px solid #ccc;
  width: 100%;
  margin: 0;
  padding: 8px 10px;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: skyblue;
  }
}

.todo__extra-text {
  font-weight: 500;
  font-size: 13px;
}

</style>
