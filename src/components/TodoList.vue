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
        @removedTodo="removeTodo"
        @finishedUpdateTodo="finishedUpdate"
      >

      </todo-item>
    </div>
    <div class="todo__extra">
      <div class="todo__extra-all">
        <label for="checkAll">
          <input
            type="checkbox"
            name="checkAll"
            :checked="!anyRemaining"
            @change="checkAllTodos"
          >
          Check All
        </label>
      </div>
      <div class="todo__extra-text">
        {{ remaining }} items left
      </div>
    </div>
    <div class="todo__extra">
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
      <div class="todo__extra-text">
        <button
          v-if="showClearCompletedButton"
          @click="clearCompleted"
        >
          Clear Completed
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import TodoItem from './TodoItem'

export default {
  name: 'todo-list',
  components: {
    TodoItem
  },
  props: {
    msg: String
  },
  data () {
    return {
      newTodo: '',
      idForTodo: 3,
      beforeEditCache: '',
      filter: 'all',
      todos: [
        {
          id: 1,
          title: 'Finish Vue Screencast',
          completed: false,
          editing: false
        },
        {
          id: 2,
          title: 'Take over world',
          completed: false,
          editing: false
        },
        {
          id: 3,
          title: 'Style vue todo app',
          completed: true,
          editing: false
        }
      ]
    }
  },
  computed: {
    remaining () {
      return this.todos.filter(todo => !todo.completed).length
    },
    anyRemaining () {
      return this.remaining !== 0
    },
    todosFiltered () {
      if (this.filter === 'all') {
        return this.todos
      } else if (this.filter === 'active') {
        return this.todos.filter(todo => !todo.completed)
      } else if (this.filter === 'completed') {
        console.log(this.todos.filter(todo => todo.completed))
        return this.todos.filter(todo => todo.completed)
      }
      return this.todos
    },
    showClearCompletedButton () {
      return this.todos.filter(todo => todo.completed).length > 0
    }
  },
  methods: {
    addTodo () {
      if (this.newTodo.trim() === '') {
        return
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false
      })

      this.newTodo = ''
      this.idForTodo++
      console.log('add todo')
    },
    finishedUpdate (data) {
      this.todos.splice(data.index, 1, data.todo)
    },
    removeTodo (id) {
      this.todos.splice(id, 1)
    },
    checkAllTodos () {
      this.todos.forEach((todo) => { todo.completed = event.target.checked })
    },
    clearCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.todo__list {
  display: flex;
  flex-direction: column;
}

.todo__extra {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e5e5e5;
  padding: 10px 0;
}

.todo__button {
  margin-right: 10px;
}

</style>
